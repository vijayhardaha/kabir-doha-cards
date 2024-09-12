import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ weight: ["400", "500"], subsets: ["latin"] });

/**
 * SideAuthor component displays the title text "Kabir Ke Dohe" with a rotated style.
 *
 * @component
 * @returns {JSX.Element} The rendered side author title component.
 */
const SideAuthor = () => (
	<div className="absolute bottom-0 z-10 pl-[var(--kdc-sideauth-block-pl)]">
		<p
			className={`relative uppercase ${montserrat.className} text-[var(--kdc-color)] flex items-center rotate-[-90deg]`}
			style={{
				fontSize: "var(--kdc-sideauth-text-fs)",
				lineHeight: "var(--kdc-sideauth-text-lh)",
				letterSpacing: "var(--kdc-sideauth-text-ls)",
				transformOrigin: "0 var(--kdc-sideauth-text-to)",
			}}
		>
			<span className="relative block bg-current h-[2px] w-[var(--kdc-sideauth-line-w)] mr-[var(--kdc-sideauth-line-mr)]" />
			<span className="font-medium whitespace-nowrap">Kabir Ke Dohe</span>
		</p>
	</div>
);

export default SideAuthor;
