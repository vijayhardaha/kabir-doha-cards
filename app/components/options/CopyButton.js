import React, { useState } from "react";

import PropTypes from "prop-types";
import { AiOutlineCopy, AiOutlineCheck } from "react-icons/ai";

import { showToast } from "@/utils/toast";
import { getSiteUrl } from "@/utils/url";

/**
 * CopyButton component copies the current Doha text to the clipboard.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.couplet - The current Doha text.
 * @returns {JSX.Element}
 */
const CopyButton = ({ couplet }) => {
	const [isCopied, setIsCopied] = useState(false);

	/**
	 * Copies the Doha couplet along with attribution to the clipboard and displays a toast notification.
	 */
	const handleCopy = () => {
		const textToCopy = `${couplet}\n\n— संत कबीर साहेब\n\nFor more insights and wisdom, visit: ${getSiteUrl()}`;

		navigator.clipboard
			.writeText(textToCopy)
			.then(() => {
				setIsCopied(true);
				showToast("Couplet copied to clipboard!");
				setTimeout(() => setIsCopied(false), 1000); // Reset copied state after 1 second.
			})
			.catch((error) => {
				console.error("Failed to copy: ", error);
				showToast("Failed to copy, try again!", "error");
			});
	};

	return (
		<>
			{/* Desktop Button */}
			<button
				onClick={handleCopy}
				className="hidden md:inline-flex items-center justify-center h-12 w-12 p-2 text-lg text-primary border-2 border-primary rounded-full hover:bg-primary hover:bg-opacity-5 focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-30"
				aria-label="Copy Doha to clipboard"
			>
				{isCopied ? <AiOutlineCheck aria-hidden="true" size={24} /> : <AiOutlineCopy aria-hidden="true" size={24} />}
				<span className="sr-only">Copy Doha</span> {/* Screen reader only text */}
			</button>

			{/* Mobile Button */}
			<button
				onClick={handleCopy}
				className="inline-flex items-center justify-center h-10 px-4 text-primary border-2 border-primary rounded-lg bg-white font-semibold hover:bg-primary hover:bg-opacity-5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-30 focus:ring-offset-2 focus:ring-offset-slate-50 md:hidden"
				aria-label="Copy Doha to clipboard"
			>
				{isCopied ? (
					<AiOutlineCheck aria-hidden="true" size={20} className="mr-2" />
				) : (
					<AiOutlineCopy aria-hidden="true" size={20} className="mr-2" />
				)}
				{isCopied ? "Copied!" : "Copy"}
			</button>
		</>
	);
};

CopyButton.propTypes = {
	couplet: PropTypes.string.isRequired, // The current Doha text.
};

export default CopyButton;
