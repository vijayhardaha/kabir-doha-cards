import PropTypes from "prop-types";

import BackgroundElement from "./BackgroundElement";
import CoupletContent from "./CoupletContent";
import SideAuthor from "./SideAuthor";
import RandomButton from "../options/RandomButton";

/**
 * PreviewBox component displays a formatted preview of a Kabir Doha card.
 * It dynamically adjusts the font size and layout based on the container width.
 * The component serves as a visual representation of the doha with styling elements.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.couplet - The text of the couplet to display.
 * @param {function(string): void} props.setCouplet - Function to update the Doha.
 * @param {boolean} props.loading - Indicates if a request is in progress.
 * @param {function(boolean): void} props.setLoading - Function to set the loading state.
 * @param {string} [props.screenReaderText] - Additional text for screen readers (optional).
 * @returns {JSX.Element} The rendered preview box.
 */
const PreviewBox = ({ couplet, setCouplet, loading, setLoading, screenReaderText }) => {
  const srText = screenReaderText || "Kabir Doha Preview Card";

  return (
    <>
      <div className="absolute right-3 bottom-3 z-20 md:hidden">
        <RandomButton setCouplet={setCouplet} loading={loading} setLoading={setLoading} />
      </div>

      <div className="relative z-10 aspect-square w-full" aria-label={srText}>
        <span className="sr-only">{srText}</span>
        <div
          id="doha-preview"
          className="absolute inset-0 h-full w-full overflow-hidden bg-white"
          role="region"
          aria-label="Doha card presentation"
        >
          <BackgroundElement />
          <SideAuthor />
          <CoupletContent couplet={couplet} />
        </div>
      </div>
    </>
  );
};

PreviewBox.propTypes = {
  couplet: PropTypes.string.isRequired,
  setCouplet: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  screenReaderText: PropTypes.string,
};

PreviewBox.defaultProps = {
  screenReaderText: "Kabir Doha Preview Card",
};

export default PreviewBox;
