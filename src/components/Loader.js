import { DNA } from "react-loader-spinner";

/**
 * Loader component to indicate data loading status.
 * Displays a spinning DNA icon and a descriptive message centered in the viewport.
 *
 * @component
 * @returns {JSX.Element} The rendered loader component.
 */
export default function Loader() {
	return (
		<div className="flex h-[400px] flex-col items-center justify-center border-2 border-dashed border-gray-200">
			<DNA visible={true} height="80" width="80" ariaLabel="DNA loading animation" wrapperClass="dna-wrapper" />
			<span className="mt-6 text-xl text-slate-900">Please wait while we fetch the data&hellip;</span>
		</div>
	);
}
