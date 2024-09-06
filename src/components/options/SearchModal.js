import React, { useState, useEffect, useRef } from "react";

import debounce from "lodash/debounce";
import PropTypes from "prop-types";
import { PiSpinnerGapLight } from "react-icons/pi";
import { RiSearchLine } from "react-icons/ri";
import { Hind } from "next/font/google";
const hind = Hind({ weight: ["400", "700"], subsets: ["latin", "devanagari"] });

/**
 * Modal component for search input and results, styled similarly to Algolia's search box.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Whether the modal is open.
 * @param {function(): void} props.onClose - Function to close the modal.
 * @param {Array<string>} props.couplets - List of default couplets to display.
 * @param {function(string): void} props.onSelect - Function to handle the selection of a Doha.
 * @returns {JSX.Element}
 */
const SearchModal = ({ isOpen, onClose, couplets, onSelect }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState(couplets);
	const [isLoading, setIsLoading] = useState(false);
	const modalRef = useRef(null);
	const inputRef = useRef(null); // Ref for the search input

	// Flag to track if event listeners should be attached
	const [shouldAttachListeners, setShouldAttachListeners] = useState(false);

	useEffect(() => {
		if (isOpen) {
			setShouldAttachListeners(true);
			if (inputRef.current) {
				inputRef.current.focus();
			}
		} else {
			setShouldAttachListeners(false);
			setSearchTerm("");
		}
	}, [isOpen]);

	useEffect(() => {
		if (!shouldAttachListeners) return;

		/**
		 * Handles keydown events to close the modal on Escape key press.
		 * @param {KeyboardEvent} event - The keyboard event.
		 */
		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		/**
		 * Handles clicks outside the modal to close it.
		 * @param {MouseEvent} event - The mouse event.
		 */
		const handleOutsideClick = (event) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				onClose();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("click", handleOutsideClick);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("click", handleOutsideClick);
		};
	}, [shouldAttachListeners, onClose]);

	useEffect(() => {
		/**
		 * Fetches search results based on the search term with a debounce delay.
		 * @param {string} term - The search term.
		 */
		const fetchSearchResults = debounce(async (term) => {
			if (term) {
				setIsLoading(true);
				try {
					const response = await fetch("/api/search", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ search: term }),
					});

					if (!response.ok) {
						throw new Error(`Network response was not ok: ${response.statusText}`);
					}

					const data = await response.json();

					if (data.success && data.results) {
						setSearchResults(data.results);
					} else {
						setSearchResults([]);
					}
				} catch (error) {
					console.error("Error fetching search results:", error);
					setSearchResults([]);
				} finally {
					setIsLoading(false);
				}
			} else {
				setSearchResults(couplets);
			}
		}, 500);

		fetchSearchResults(searchTerm);

		// Cleanup the debounce function on unmount
		return () => {
			fetchSearchResults.cancel();
		};
	}, [searchTerm, couplets]);

	if (!isOpen) return null;

	return (
		<>
			{/* Backdrop */}
			<div
				className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-[2px]"
				aria-hidden="true"
				onClick={onClose}
			></div>

			{/* Modal */}
			<div
				role="dialog"
				aria-labelledby="modal-title"
				aria-modal="true"
				className="fixed inset-0 z-50 px-5 h-screen w-screen overflow-x-hidden overflow-y-auto"
			>
				<div
					ref={modalRef}
					role="document"
					className="relative mt-20 mb-0 mx-auto w-full max-w-[480px] rounded-lg bg-white shadow-lg overflow-hidden"
					tabIndex="-1" // Allow focus for accessibility
				>
					<span className="sr-only" id="search-modal-title">
						Search doha
					</span>
					<div className="flex items-center px-4 py-2 border-b border-gray-200">
						<RiSearchLine className="block text-gray-500 w-7 h-7 mr-3" aria-hidden="true" />

						<input
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder="Search for Doha..."
							className="w-full py-2 px-2 pl-0 border-none outline-none placeholder-gray-400 bg-white rounded-lg text-sm"
							aria-label="Search"
							ref={inputRef}
						/>
						<PiSpinnerGapLight size={24} className={`ml-2 ${isLoading ? "animate-spin" : "opacity-0"}`} />
						<button
							onClick={onClose}
							className="ml-2 cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-500 shadow-md hover:text-gray-700"
							aria-label="Close"
						>
							<span aria-hidden="true">Esc</span>
						</button>
					</div>

					{/* Search results */}
					<div className="py-2 relative">
						{isLoading && (
							<div className="absolute z-10 bg-gray-200 bg-opacity-35 w-full h-full top-0 left-0 flex items-center justify-center">
								<PiSpinnerGapLight size={30} className="animate-spin" />
							</div>
						)}

						{searchResults.length > 0 ? (
							searchResults.map((text, index) => (
								<button
									key={index}
									onClick={() => onSelect(text)}
									className={`${hind.className} block w-full px-6 py-3 text-left tracking-wide text-sm font-medium border-b border-gray-100 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 whitespace-pre-wrap ${
										index === searchResults.length - 1 ? "border-b-0" : ""
									}`}
									aria-label={`Select ${text}`}
								>
									{text}
								</button>
							))
						) : (
							<p className="px-6 py-3 text-gray-500 text-lg font-semibold">No results found</p>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

SearchModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	couplets: PropTypes.arrayOf(PropTypes.string).isRequired,
	onSelect: PropTypes.func.isRequired,
};

export default SearchModal;
