import React from "react";

import { MdArrowOutward } from "react-icons/md";

import { SITE_TITLE_SHORT } from "@/constants/seo";
import { getShareUrl } from "@/utils/share";

/**
 * Footer component displays information about the app, details about Kabir Das, and contact information.
 *
 * @component
 * @returns {JSX.Element} The rendered footer section.
 */
const Footer = () => (
	<footer>
		{/* Top section with light gray background */}
		<div className="bg-zinc-50 text-gray-800 py-16">
			<div className="container mx-auto">
				<p className="mb-8 text-lg font-medium leading-relaxed">
					Kabir Doha Cards is an innovative platform that allows you to create beautiful and personalized Kabir Doha
					cards effortlessly. Whether for inspiration, sharing wisdom, or celebrating special occasions, our tool
					provides a simple and elegant way to craft and share these timeless pieces of wisdom.
				</p>

				<h2 className="mb-4 text-2xl font-bold border-l-4 border-primary pl-3" id="about-kabir-das">
					About Kabir Das
				</h2>
				<p className="mb-8 leading-relaxed">
					Kabir Das was a 15th-century Indian poet and saint whose verses have had a profound influence on Indian
					literature and spirituality. His poetry, written in the vernacular, addresses themes of devotion and
					mysticism, transcending religious boundaries.
					<br />
					For more detailed information, visit his Wikipedia page:{" "}
					<a
						href="https://en.wikipedia.org/wiki/Kabir"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center underline text-primary"
						aria-label="Kabir Das on Wikipedia"
					>
						Kabir Das on Wikipedia
						<MdArrowOutward aria-hidden="true" />
					</a>
					.
				</p>

				<h3 className="mb-4 text-xl font-semibold border-l-4 border-primary pl-3" id="contact">
					Contact
				</h3>
				<p className="mb-8 leading-relaxed">
					For new projects or work opportunities, feel free to reach out to me on Twitter at{" "}
					<a
						href="https://twitter.com/vijayhardaha"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center underline text-primary"
						aria-label="Twitter profile of @vijayhardaha"
					>
						@vijayhardaha
						<MdArrowOutward aria-hidden="true" />
					</a>{" "}
					or through PeoplePerHour at{" "}
					<a
						href="https://pph.me/vijayhardaha"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center underline text-primary"
						aria-label="PeoplePerHour profile of vijayhardaha"
					>
						pph.me/vijayhardaha
						<MdArrowOutward aria-hidden="true" />
					</a>
					.
				</p>

				<h3 className="mb-4 text-xl font-semibold border-l-4 border-primary pl-3" id="share">
					Share
				</h3>
				<p className="leading-relaxed">
					Help spread the word about Kabir Doha Cards! Share this amazing tool with others via WhatsApp:{" "}
					<a
						href={getShareUrl()}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center underline text-primary"
						aria-label="Share on WhatsApp"
					>
						Share on WhatsApp
						<MdArrowOutward aria-hidden="true" />
					</a>{" "}
					or via Twitter:{" "}
					<a
						href={getShareUrl("x")}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center underline text-primary"
						aria-label="Share on Twitter"
					>
						Share on Twitter
						<MdArrowOutward aria-hidden="true" />
					</a>
				</p>
			</div>
		</div>

		{/* Bottom section with dark background */}
		<div className="bg-gray-800 text-white p-6 text-center">
			<div className="container mx-auto">
				<p className="text-sm leading-loose">
					Copyright &copy; 2024 {SITE_TITLE_SHORT}. All rights reserved.
					<br />
					Created by{" "}
					<a
						href="https://twitter.com/vijayhardaha"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center underline text-primary"
					>
						Vijay Hardaha
						<MdArrowOutward aria-hidden="true" />
					</a>{" "}
					using{" "}
					<a
						href="https://nextjs.org/"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center underline text-primary"
					>
						Next.js
						<MdArrowOutward aria-hidden="true" />
					</a>{" "}
					and{" "}
					<a
						href="https://tailwindcss.com/"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center underline text-primary"
					>
						Tailwind CSS
						<MdArrowOutward aria-hidden="true" />
					</a>
				</p>
			</div>
		</div>
	</footer>
);

export default Footer;
