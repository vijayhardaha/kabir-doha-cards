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
      <button onClick={handleCopy} className="icon-btn" aria-label="Copy Doha to clipboard">
        {isCopied ? <AiOutlineCheck aria-hidden="true" size={24} /> : <AiOutlineCopy aria-hidden="true" size={24} />}
        <span className="sr-only">Copy Doha</span> {/* Screen reader only text */}
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
  couplet: PropTypes.string.isRequired, // The current Doha text.
};

export default CopyButton;
