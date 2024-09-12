"use client";

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
		<div className="flex flex-col items-center justify-center h-[400px] border-2 border-dashed border-stone-200">
			<DNA visible={true} height="80" width="80" ariaLabel="DNA loading animation" wrapperClass="dna-wrapper" />
			<span className="mt-6 text-xl text-slate-900">Please wait while we fetch the data&hellip;</span>
		</div>
	);
}
