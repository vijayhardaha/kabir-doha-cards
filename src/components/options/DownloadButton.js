import React, { useState } from "react";

import domtoimage from "dom-to-image";
import { AiOutlineCloudDownload, AiOutlineCheck } from "react-icons/ai";

import { extractExtensionFromBase64, generateUniqueId } from "@/utils/download";
import { showToast } from "@/utils/toast";

/**
 * DownloadButton component triggers the download of the Doha card.
 * @component
 * @returns {JSX.Element} The rendered download button component.
 */
const DownloadButton = () => {
	const [isDownloaded, setIsDownloaded] = useState(false);

	/**
	 * Handles the download of the Doha card and displays a toast notification.
	 * @function
	 */
	const handleDownload = () => {
		const node = document.getElementById("doha-preview");

		if (node) {
			// Ensure that the node exists before proceeding.
			const rect = node.getBoundingClientRect();
			const width = rect.width * 4;
			const height = rect.height * 4;

			const options = {
				width,
				height,
				quality: 0.7,
				style: {
					transform: "scale(4)",
					transformOrigin: "top left",
				},
			};

			domtoimage
				.toJpeg(node, options)
				.then((dataUrl) => {
					const extension = extractExtensionFromBase64(dataUrl);
					const uniqueId = generateUniqueId();
					const link = document.createElement("a");
					link.download = `kabir-doha-card-${uniqueId}.${extension}`;
					link.href = dataUrl;
					link.click();
					setIsDownloaded(true);
					showToast("Image downloaded successfully!");
					setTimeout(() => setIsDownloaded(false), 1000); // Reset downloaded state after 1 second.
				})
				.catch((error) => {
					console.error("Failed to download: ", error);
					showToast("Download failed, try again!", "error");
				});
		} else {
			console.error("Element with id 'doha-preview' not found.");
			showToast("Failed: Element not found!", "error");
		}
	};

	return (
		<>
			{/* Desktop Button */}
			<button
				onClick={handleDownload}
				className="hidden md:inline-flex items-center justify-center h-12 w-12 p-2 text-lg text-primary border-2 border-primary rounded-full hover:bg-primary hover:bg-opacity-10 focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50"
				aria-label="Download image"
			>
				{isDownloaded ? (
					<AiOutlineCheck aria-hidden="true" size={24} />
				) : (
					<AiOutlineCloudDownload aria-hidden="true" size={24} />
				)}
				<span className="sr-only">Download</span> {/* Screen reader only text */}
			</button>

			{/* Mobile Button */}
			<button
				onClick={handleDownload}
				className="inline-flex items-center justify-center h-10 px-4 text-white font-semibold bg-primary rounded-lg md:hidden hover:bg-primary hover:bg-opacity-85 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-slate-50"
				aria-label="Download image"
				data-tooltip-id="download-doha-tooltip"
			>
				{isDownloaded ? (
					<AiOutlineCheck aria-hidden="true" size={20} className="mr-2" />
				) : (
					<AiOutlineCloudDownload aria-hidden="true" size={20} className="mr-2" />
				)}
				{isDownloaded ? "Downloaded!" : "Download"}
			</button>
		</>
	);
};

export default DownloadButton;
