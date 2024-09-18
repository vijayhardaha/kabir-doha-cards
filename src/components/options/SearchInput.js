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
					className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-stone-100 bg-stone-100 px-2 py-2 text-base text-stone-700 outline-none focus:border-primary focus:ring-4 focus:ring-green-100"
				>
					<RiSearchLine aria-hidden="true" className="h-5 w-5" />
				</button>
			</div>

			{/* Mobile Input */}
			<div className="relative md:hidden">
				<span className="absolute left-3 top-2/4 -translate-y-2/4">
					<RiSearchLine aria-hidden="true" className="h-5 w-5 text-stone-400" />
				</span>
				<input
					type="text"
					value=""
					placeholder="Looking for a specific doha? Search here…"
					onClick={handleSearch}
					readOnly
					aria-label="Search doha"
					className="h-12 w-full cursor-pointer truncate rounded-lg border-2 border-stone-100 bg-stone-100 px-4 py-2 pl-9 text-base text-stone-700 outline-none transition-all duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-green-100"
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
