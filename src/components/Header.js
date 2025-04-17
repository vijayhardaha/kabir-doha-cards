import React from "react";

import Link from "next/link";
import { AiOutlineWhatsApp, AiOutlineGithub } from "react-icons/ai";

import Logo from "@/components/Logo";
import { getShareUrl } from "@/utils/share";

/**
 * Header component displaying the site's branding, navigation links, and social sharing options.
 * Contains the site logo, title, a link to the GitHub repository, and a WhatsApp share button.
 *
 * @component
 * @returns {JSX.Element} The rendered header component.
 */
const Header = () => (
  <header className="sticky top-0 z-1000 bg-white py-2 shadow-xs" aria-label="Site header">
    <div className="main-container">
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-2 font-bold text-stone-900">
          <Logo aria-hidden="true" className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" />

          <Link href="/" className="text-lg md:text-xl lg:text-2xl" aria-label="Kabir Doha Cards - Home page">
            Kabir Doha Cards
          </Link>
        </h1>

        <div className="flex items-center space-x-2">
          <Link
            href="https://github.com/vijayhardaha/kabir-doha-cards"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center text-sm font-medium text-stone-800 hover:underline sm:flex"
            aria-label="View the source code on GitHub (opens in a new tab)"
          >
            <AiOutlineGithub aria-hidden="true" className="mr-1 text-sm" />
            Source Code
            <span className="sr-only">(opens in a new tab)</span>
          </Link>

          {/* Vertical Divider */}
          <span className="hidden h-3 border-l border-stone-300 sm:flex" aria-hidden="true"></span>

          <Link
            href={getShareUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm font-medium text-green-600 hover:underline"
            aria-label="Share on WhatsApp (opens in a new tab)"
          >
            <AiOutlineWhatsApp aria-hidden="true" className="mr-1 text-sm" />
            Share It!
            <span className="sr-only">(opens in a new tab)</span>
          </Link>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
