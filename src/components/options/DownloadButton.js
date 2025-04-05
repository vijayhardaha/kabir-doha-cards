import React, { useState } from "react";

import domtoimage from "dom-to-image";
import { AiOutlineCloudDownload, AiOutlineCheck } from "react-icons/ai";
import { PiSpinnerGapLight } from "react-icons/pi";
import { Tooltip as ReactTooltip } from "react-tooltip";

import { extractExtensionFromBase64, generateUniqueId } from "@/utils/download";
import { showToast } from "@/utils/toast";

/**
 * DownloadButton component triggers the download of the Doha card.
 * @component
 * @returns {JSX.Element} The rendered download button component.
 */
const DownloadButton = () => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  /**
   * Handles the download of the Doha card and displays a toast notification.
   * @function
   */
  const handleDownload = () => {
    const node = document.getElementById("doha-preview");

    if (node) {
      // Ensure that the node exists before proceeding.
      setDownloading(true); // Set downloading state to true.
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
          setDownloaded(true);
          setDownloading(false);
          showToast("Image downloaded successfully!");
          setTimeout(() => setDownloaded(false), 1000);
        })
        .catch((error) => {
          console.error("Failed to download: ", error);
          showToast("Download failed, try again!", "error");
          setDownloading(false);
        });
    } else {
      console.error("Element with id 'doha-preview' not found.");
      showToast("Failed: Element not found!", "error");
    }
  };

  return (
    <>
      {/* Initialize React Tooltip with id */}
      <ReactTooltip id="download-doha-tooltip" effect="solid" />

      {/* Desktop Button */}
      <button
        onClick={handleDownload}
        className="icon-btn"
        aria-label="Download image"
        data-tooltip-id="download-doha-tooltip"
        data-tooltip-content={downloading ? "Downloading..." : downloaded ? "Downloaded!" : "Download image"}
        disabled={downloading}
      >
        {downloading ? (
          <PiSpinnerGapLight aria-hidden="true" size={24} className="animate-spin" />
        ) : downloaded ? (
          <AiOutlineCheck aria-hidden="true" size={24} />
        ) : (
          <AiOutlineCloudDownload aria-hidden="true" size={24} />
        )}
        <span className="sr-only">Download</span>
      </button>

      {/* Mobile Button */}
      <button onClick={handleDownload} className="text-btn" aria-label="Download image" disabled={downloading}>
        {downloading ? (
          <PiSpinnerGapLight aria-hidden="true" size={20} className="mr-2 animate-spin" />
        ) : downloaded ? (
          <AiOutlineCheck aria-hidden="true" size={20} className="mr-2" />
        ) : (
          <AiOutlineCloudDownload aria-hidden="true" size={20} className="mr-2" />
        )}
        {downloading ? "Downloading..." : downloaded ? "Downloaded!" : "Download"}
      </button>
    </>
  );
};

export default DownloadButton;
