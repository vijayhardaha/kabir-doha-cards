import React, { useState } from "react";

import PropTypes from "prop-types";
import { RiSearchLine } from "react-icons/ri";

import SearchModal from "./SearchModal";

/**
 * SearchInput component allows users to search and select a Doha from a list.
 *
 * @param {Object} props - The component props.
 * @param {function(string): void} props.setCouplet - Function to update the selected Doha.
 * @param {string[]} props.couplets - List of available Doha options.
 * @returns {JSX.Element} The rendered component.
 */
const SearchInput = ({ setCouplet, couplets }) => {
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	const handleSearch = () => {
		setIsSearchOpen(true);
	};

	const handleSelectDoha = (selectedDoha) => {
		setCouplet(selectedDoha);
		setIsSearchOpen(false);
	};

	return (
		<>
			{/* Desktop Button */}
			<div className="relative hidden md:inline-flex">
				<button
					onClick={handleSearch}
					aria-label="Open search"
					className="flex items-center justify-center w-10 h-10 py-2 px-2 text-base text-gray-700 border-2 border-gray-100 bg-gray-100 rounded-lg outline-none focus:border-primary focus:ring-4 focus:ring-green-100"
				>
					<RiSearchLine aria-hidden="true" className="h-5 w-5" />
				</button>
			</div>

			{/* Mobile Input */}
			<div className="relative md:hidden">
				<span className="absolute top-2/4 left-3 -translate-y-2/4">
					<RiSearchLine aria-hidden="true" className="h-5 w-5 text-gray-400" />
				</span>
				<input
					type="text"
					value=""
					placeholder="Looking for a specific doha? Search here…"
					onClick={handleSearch}
					readOnly
					aria-label="Search doha"
					className="w-full h-10 py-2 px-4 pl-9 text-base text-gray-700 border-2 border-gray-100 bg-gray-100 rounded-lg outline-none focus:border-primary focus:ring-4 focus:ring-green-100 cursor-pointer truncate transition-all duration-300 ease-in-out"
				/>
			</div>

			{/* Modal for search input and results */}
			<SearchModal
				isOpen={isSearchOpen}
				onClose={() => setIsSearchOpen(false)}
				couplets={couplets}
				onSelect={handleSelectDoha}
				aria-labelledby="search-modal-title"
			/>
		</>
	);
};

SearchInput.propTypes = {
	setCouplet: PropTypes.func.isRequired,
	couplets: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SearchInput;
