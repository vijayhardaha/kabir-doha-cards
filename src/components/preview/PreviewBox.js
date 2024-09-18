import PropTypes from "prop-types";

import BackgroundElement from "./BackgroundElement";
import CoupletContent from "./CoupletContent";
import SideAuthor from "./SideAuthor";
import RandomButton from "../options/RandomButton";

/**
 * PreviewBox component displays a formatted preview of a Kabir Doha card.
 * It dynamically adjusts the font size and layout based on the container width.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.couplet - The text of the couplet to display.
 * @param {function(string): void} props.setCouplet - Function to update the Doha.
 * @returns {JSX.Element} The rendered preview box.
 */
const PreviewBox = ({ couplet, setCouplet }) => {
	return (
		<>
			<div className="absolute bottom-3 right-3 z-20 md:hidden">
				<RandomButton setCouplet={setCouplet} />
			</div>

			<div className="relative z-10 aspect-square w-full">
				<div id="doha-preview" className="absolute inset-0 h-full w-full overflow-hidden bg-white">
					<BackgroundElement />
					<SideAuthor />
					<CoupletContent couplet={couplet} />
				</div>
			</div>
		</>
	);
};

PreviewBox.propTypes = {
	couplet: PropTypes.string.isRequired, // The text of the couplet to display.
	setCouplet: PropTypes.func.isRequired, // Function to update the Doha.
};

export default PreviewBox;
