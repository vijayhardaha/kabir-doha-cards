import React, { useState } from "react";

import PropTypes from "prop-types";
import { AiOutlineCopy, AiOutlineCheck } from "react-icons/ai";
import { Tooltip as ReactTooltip } from "react-tooltip";

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
        setTimeout(() => setIsCopied(false), 1000);
      })
      .catch((error) => {
        console.error("Failed to copy: ", error);
        showToast("Failed to copy, try again!", "error");
      });
  };

  return (
    <>
      {/* Initialize React Tooltip with id */}
      <ReactTooltip id="copy-tooltip" effect="solid" />

      {/* Desktop Button */}
      <button
        onClick={handleCopy}
        className="icon-btn"
        aria-label="Copy Doha to clipboard"
        data-tooltip-id="copy-tooltip"
        data-tooltip-content={isCopied ? "Copied!" : "Copy doha to clipboard"}
      >
        {isCopied ? <AiOutlineCheck aria-hidden="true" size={24} /> : <AiOutlineCopy aria-hidden="true" size={24} />}
        {/* Screen reader only text */}
        <span className="sr-only">Copy Doha</span>
      </button>

      {/* Mobile Button */}
      <button onClick={handleCopy} className="text-btn outlined" aria-label="Copy Doha to clipboard">
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
  couplet: PropTypes.string.isRequired,
};

export default CopyButton;
