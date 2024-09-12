import Link from "next/link";
import { AiOutlineWhatsApp, AiOutlineGithub } from "react-icons/ai";

import Logo from "./Logo";
import { getShareUrl } from "@/utils/share";

/**
 * Header component displaying the title, GitHub button, and a WhatsApp share button.
 *
 * @component
 * @returns {JSX.Element} The rendered header component.
 */
const Header = () => (
	<header className="mb-8 py-4">
		<div className="container mx-auto">
			<div className="flex items-center justify-between">
				<h1 className="flex items-center gap-2 text-stone-900 font-bold">
					<Logo aria-hidden="true" className="h-10 w-10 md:h-12 md:w-12 lg:h-16 lg:w-16" />

					<Link href="/" className="text-lg md:text-xl lg:text-2xl">
						Kabir Doha Cards
					</Link>
				</h1>

				<div className="flex items-center space-x-2">
					<a
						href="https://github.com/vijayhardaha/kabir-doha-cards"
						target="_blank"
						rel="noopener noreferrer"
						className="hidden items-center text-sm font-medium text-stone-800 hover:underline sm:flex"
						aria-label="View the source code on GitHub"
					>
						<AiOutlineGithub aria-hidden="true" className="mr-1 text-sm" />
						View Source Code
					</a>

					{/* Vertical Divider */}
					<span className="hidden h-3 border-l border-stone-300 sm:flex"></span>

					<a
						href={getShareUrl()}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center text-sm font-medium text-green-600 hover:underline"
						aria-label="Share on WhatsApp"
					>
						<AiOutlineWhatsApp aria-hidden="true" className="mr-1 text-sm" />
						Share the App
					</a>
				</div>
			</div>
		</div>
	</header>
);

export default Header;
