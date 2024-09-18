import React, { useState } from "react";

import domtoimage from "dom-to-image";
import { AiOutlineCloudDownload, AiOutlineCheck } from "react-icons/ai";
import { PiSpinnerGapLight } from "react-icons/pi";

import { extractExtensionFromBase64, generateUniqueId } from "@/utils/download";
import { showToast } from "@/utils/toast";

/**
 * DownloadButton component triggers the download of the Doha card.
 * @component
 * @returns {JSX.Element} The rendered download button component.
 */
const DownloadButton = () => {
	const [isDownloading, setIsDownloading] = useState(false);
	const [isDownloaded, setIsDownloaded] = useState(false);

	/**
	 * Handles the download of the Doha card and displays a toast notification.
	 * @function
	 */
	const handleDownload = () => {
		const node = document.getElementById("doha-preview");

		if (node) {
			// Ensure that the node exists before proceeding.
			setIsDownloading(true); // Set downloading state to true.
			const rect = node.getBoundingClientRect();
			const width = rect.width * 6;
			const height = rect.height * 6;

			const options = {
				width,
				height,
				quality: 0.75,
				style: {
					transform: "scale(6)",
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
					setIsDownloading(false); // Reset downloading state.
					showToast("Image downloaded successfully!");
					setTimeout(() => setIsDownloaded(false), 1000); // Reset downloaded state after 1 second.
				})
				.catch((error) => {
					console.error("Failed to download: ", error);
					showToast("Download failed, try again!", "error");
					setIsDownloading(false); // Reset downloading state on error.
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
				className="hidden h-12 w-12 items-center justify-center rounded-full border-2 border-primary p-2 text-lg text-primary hover:bg-primary hover:bg-opacity-5 focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-30 md:inline-flex"
				aria-label="Download image"
			>
				{isDownloading ? (
					<PiSpinnerGapLight aria-hidden="true" size={24} className="animate-spin" />
				) : isDownloaded ? (
					<AiOutlineCheck aria-hidden="true" size={24} />
				) : (
					<AiOutlineCloudDownload aria-hidden="true" size={24} />
				)}
				<span className="sr-only">Download</span>
			</button>

			{/* Mobile Button */}
			<button
				onClick={handleDownload}
				className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 font-semibold text-white hover:bg-primary hover:bg-opacity-85 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-30 focus:ring-offset-2 focus:ring-offset-slate-50 md:hidden"
				aria-label="Download image"
				data-tooltip-id="download-doha-tooltip"
			>
				{isDownloading ? (
					<PiSpinnerGapLight aria-hidden="true" size={20} className="mr-2 animate-spin" />
				) : isDownloaded ? (
					<AiOutlineCheck aria-hidden="true" size={20} className="mr-2" />
				) : (
					<AiOutlineCloudDownload aria-hidden="true" size={20} className="mr-2" />
				)}
				{isDownloading ? "Downloading..." : isDownloaded ? "Downloaded!" : "Download"}
			</button>
		</>
	);
};

export default DownloadButton;
