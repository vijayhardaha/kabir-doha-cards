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
			<div className="absolute z-20 bottom-3 right-3 md:hidden">
				<RandomButton setCouplet={setCouplet} />
			</div>

			<div className="relative z-10 w-full aspect-square">
				<div id="doha-preview" className="absolute inset-0 w-full h-full bg-white overflow-hidden">
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
