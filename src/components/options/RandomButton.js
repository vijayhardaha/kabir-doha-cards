"use client";

import React, { useState } from "react";

import PropTypes from "prop-types";
import { TfiReload } from "react-icons/tfi";

import { showToast } from "@/utils/toast";

/**
 * RandomButton component triggers the randomization of the Doha.
 * @component
 * @param {Object} props - The component props.
 * @param {function(string): void} props.setCouplet - Function to set the random Doha.
 * @returns {JSX.Element} The rendered button component.
 */
const RandomButton = ({ setCouplet }) => {
	const [processing, setProcessing] = useState(false);

	/**
	 * Fetches a random Doha from the server and updates the state with the couplet.
	 * Displays appropriate toast notifications for success or failure.
	 * Prevents duplicate requests while already processing.
	 *
	 * @async
	 * @function fetchRandomDoha
	 * @returns {Promise<void>} Resolves once the Doha is fetched and state is updated.
	 */
	const fetchRandomDoha = async () => {
		if (processing) return; // Prevent multiple simultaneous requests.

		setProcessing(true);

		try {
			const response = await fetch("/api/random", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});

			if (!response.ok) {
				throw new Error(`Network response was not ok: ${response.statusText}`);
			}

			const data = await response.json();

			if (data.success && data.couplet) {
				setCouplet(data.couplet);
			} else {
				console.warn("No results found for random Doha.");
				showToast("No Doha found, try again!", "error");
			}
		} catch (error) {
			console.error("Error fetching random Doha:", error);
			showToast("Error fetching Doha, try again!", "error");
		} finally {
			setProcessing(false); // Reset processing state after the request completes.
		}
	};

	return (
		<button
			onClick={fetchRandomDoha}
			className="relative flex h-16 w-16 transform items-center justify-center rounded-full bg-primary p-2 text-xl text-white transition-transform duration-200 ease-in-out hover:bg-opacity-85 focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-30 active:rotate-[270deg] active:scale-90"
			aria-label="Get Random Doha"
		>
			<TfiReload aria-hidden="true" size={30} />
			<span className="sr-only">Get Random Doha</span> {/* Screen reader only text */}
		</button>
	);
};

RandomButton.propTypes = {
	setCouplet: PropTypes.func.isRequired, // Function to set the random Doha.
};

export default RandomButton;
