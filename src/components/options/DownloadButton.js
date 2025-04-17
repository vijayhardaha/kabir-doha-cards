import React, { useState } from "react";

import domtoimage from "dom-to-image";
import PropTypes from "prop-types";
import { AiOutlineCloudDownload, AiOutlineCheck } from "react-icons/ai";
import { PiSpinnerGapLight } from "react-icons/pi";
import { Tooltip as ReactTooltip } from "react-tooltip";

import { extractExtensionFromBase64, generateUniqueId } from "@/utils/download";
import { showToast } from "@/utils/toast";

/**
 * DownloadButton component triggers the download of the Doha card as an image.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.elementId="doha-preview"] - ID of the element to be downloaded
 * @param {string} [props.fileNamePrefix="kabir-doha-card"] - Prefix for the downloaded file name
 * @param {number} [props.scaleFactor=6] - Scale factor for the downloaded image
 * @param {number} [props.quality=0.75] - Quality of the downloaded image (0-1)
 * @returns {JSX.Element} The rendered download button component
 */
const DownloadButton = ({
  elementId = "doha-preview",
  fileNamePrefix = "kabir-doha-card",
  scaleFactor = 6,
  quality = 0.75,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  /**
   * Handles the download of the Doha card and displays a toast notification.
   * Captures the specified element as an image and initiates download.
   *
   * @function
   * @returns {void}
   */
  const handleDownload = () => {
    const node = document.getElementById(elementId);

    if (node) {
      // Ensure that the node exists before proceeding.
      setDownloading(true); // Set downloading state to true.
      const rect = node.getBoundingClientRect();
      const width = rect.width * scaleFactor;
      const height = rect.height * scaleFactor;

      const options = {
        width,
        height,
        quality,
        style: {
          transform: `scale(${scaleFactor})`,
          transformOrigin: "top left",
        },
      };

      domtoimage
        .toJpeg(node, options)
        .then((dataUrl) => {
          const extension = extractExtensionFromBase64(dataUrl);
          const uniqueId = generateUniqueId();
          const link = document.createElement("a");
          link.download = `${fileNamePrefix}-${uniqueId}.${extension}`;
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
      console.error(`Element with id '${elementId}' not found.`);
      showToast("Failed: Element not found!", "error");
    }
  };

  // Screen reader text based on current state
  const screenReaderText = downloading
    ? "Downloading your Doha card as an image"
    : downloaded
      ? "Doha card successfully downloaded"
      : "Download your Doha card as an image";

  return (
    <>
      {/* Initialize React Tooltip with id */}
      <ReactTooltip id="download-doha-tooltip" effect="solid" />

      {/* Desktop Button */}
      <button
        onClick={handleDownload}
        className="icon-btn"
        aria-label={screenReaderText}
        data-tooltip-id="download-doha-tooltip"
        data-tooltip-content={downloading ? "Downloading..." : downloaded ? "Downloaded!" : "Download image"}
        disabled={downloading}
        aria-busy={downloading}
      >
        {downloading ? (
          <PiSpinnerGapLight aria-hidden="true" size={24} className="animate-spin" />
        ) : downloaded ? (
          <AiOutlineCheck aria-hidden="true" size={24} />
        ) : (
          <AiOutlineCloudDownload aria-hidden="true" size={24} />
        )}
        <span className="sr-only">{screenReaderText}</span>
      </button>

      {/* Mobile Button */}
      <button
        onClick={handleDownload}
        className="text-btn"
        aria-label={screenReaderText}
        disabled={downloading}
        aria-busy={downloading}
      >
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

DownloadButton.propTypes = {
  /** ID of the element to be downloaded */
  elementId: PropTypes.string,
  /** Prefix for the downloaded file name */
  fileNamePrefix: PropTypes.string,
  /** Scale factor for the downloaded image */
  scaleFactor: PropTypes.number,
  /** Quality of the downloaded image (0-1) */
  quality: PropTypes.number,
};

export default DownloadButton;
