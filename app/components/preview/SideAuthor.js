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
			className={`relative uppercase ${montserrat.className} flex rotate-[-90deg] items-center text-[var(--kdc-color)]`}
			style={{
				fontSize: "var(--kdc-sideauth-text-fs)",
				lineHeight: "var(--kdc-sideauth-text-lh)",
				letterSpacing: "var(--kdc-sideauth-text-ls)",
				transformOrigin: "0 var(--kdc-sideauth-text-to)",
			}}
		>
			<span className="relative mr-[var(--kdc-sideauth-line-mr)] block h-[2px] w-[var(--kdc-sideauth-line-w)] bg-current" />
			<span className="whitespace-nowrap font-medium">Kabir Ke Dohe</span>
		</p>
	</div>
);

export default SideAuthor;
