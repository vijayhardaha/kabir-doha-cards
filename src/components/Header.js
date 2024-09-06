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
	<header className="mb-6 py-2">
		<div className="container mx-auto">
			<div className="flex items-center justify-between">
				<h1 className="flex items-center justify-center gap-2 text-gray-900 font-bold">
					<Logo aria-hidden="true" className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16" />

					<Link href="/" className="text-lg md:text-xl lg:text-2xl">
						Kabir Doha Cards
					</Link>
				</h1>

				<div className="flex items-center space-x-2">
					<a
						href="https://github.com/vijayhardaha/kabir-doha-cards"
						target="_blank"
						rel="noopener noreferrer"
						className="hidden sm:inline-flex items-center justify-center h-8 px-3 text-sm text-white bg-gray-800 border-2 border-gray-800 font-medium rounded-lg hover:bg-white hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
						aria-label="View the source code on GitHub"
					>
						<AiOutlineGithub aria-hidden="true" className="mr-1 text-base" />
						<span>Source Code</span>
					</a>

					<a
						href={getShareUrl()}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center h-8 px-3 text-sm text-gray-800 bg-white border-2 border-gray-800 font-medium rounded-lg hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
						aria-label="Share on WhatsApp"
					>
						<AiOutlineWhatsApp aria-hidden="true" className="mr-1 text-base" />
						<span>Share</span>
					</a>
				</div>
			</div>
		</div>
	</header>
);

export default Header;
