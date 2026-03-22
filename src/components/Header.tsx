import type { JSX } from 'react';

import Link from 'next/link';
import { AiOutlineWhatsApp, AiOutlineGithub } from 'react-icons/ai';

import Logo from '@/components/Logo';
import { getShareUrl } from '@/utils/share';

/**
 * Renders the site header with branding, source, and share links.
 *
 * @returns {JSX.Element} The rendered header.
 */
const Header = (): JSX.Element => (
  <header className="header" aria-label="Site header">
    <div className="container">
      <div className="header__row">
        <h1 className="header__brand">
          <Logo className="header__logo" />

          <Link href="/" className="header__title">
            Kabir Doha Cards
          </Link>
        </h1>

        <nav className="header__nav" aria-label="Header navigation">
          <Link
            href="https://github.com/vijayhardaha/kabir-doha-cards"
            target="_blank"
            rel="noopener noreferrer"
            className="header__link"
            aria-label="View the source code on GitHub (opens in a new tab)"
          >
            <AiOutlineGithub aria-hidden="true" className="header__icon" />
            Source Code
            <span className="sr-only">(opens in a new tab)</span>
          </Link>

          <span className="header__divider" aria-hidden="true"></span>

          <Link
            href={getShareUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="header__link header__link--primary"
            aria-label="Share on WhatsApp (opens in a new tab)"
          >
            <AiOutlineWhatsApp aria-hidden="true" className="header__icon" />
            Share It!
            <span className="sr-only">(opens in a new tab)</span>
          </Link>
        </nav>
      </div>
    </div>
  </header>
);

export default Header;
