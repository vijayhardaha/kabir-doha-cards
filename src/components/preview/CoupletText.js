import React from "react";

import { Hind } from "next/font/google";
import PropTypes from "prop-types";

import { formatCouplet } from "@/utils/preview";

const hind = Hind({ weight: ["400", "700"], subsets: ["latin", "devanagari"] });

/**
 * CoupletText component displays the formatted text of a couplet.
 * The component shows the couplet in a stylized format, with each line as a separate block.
 * It provides accessibility features through optional screen reader text and ARIA attributes.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.couplet - The text of the couplet to be displayed.
 * @param {string} [props.screenReaderText] - Optional accessible text for screen readers that might provide additional context or a full recitation of the couplet.
 * @returns {JSX.Element} The rendered couplet text component.
 *
 * @example
 * // Basic usage
 * <CoupletText couplet="कबीर जब तुं जायगा..." />
 *
 * @example
 * // With screen reader text
 * <CoupletText
 *   couplet="कबीर जब तुं जायगा..."
 *   screenReaderText="Kabir says when you depart from this world..."
 * />
 */
const CoupletText = ({ couplet, screenReaderText }) => (
  <div
    className={`relative block w-full font-bold ${hind.className}`}
    style={{
      fontSize: "var(--kdc-couplet-text-fs)",
      lineHeight: "var(--kdc-couplet-text-lh)",
    }}
    aria-label={screenReaderText || "Couplet text"}
  >
    {screenReaderText && <span className="sr-only">{screenReaderText}</span>}
    {formatCouplet(couplet).map((line, index) => (
      <span className="block w-full truncate" key={index} aria-hidden={!!screenReaderText}>
        {line}
      </span>
    ))}
  </div>
);

CoupletText.propTypes = {
  couplet: PropTypes.string.isRequired, // Text of the couplet to be displayed.
  screenReaderText: PropTypes.string, // Optional accessible text for screen readers.
};

export default CoupletText;
