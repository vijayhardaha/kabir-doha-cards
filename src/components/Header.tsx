import Link from 'next/link';
import { AiOutlineWhatsApp, AiOutlineGithub } from 'react-icons/ai';

import Logo from '@/components/Logo';
import { getShareUrl } from '@/utils/share';

/**
 * Header component displaying the site's branding, navigation links, and social sharing options.
 * Contains the site logo, title, a link to the GitHub repository, and a WhatsApp share button.
 *
 * @component
 * @returns {JSX.Element} The rendered header component.
 */
const Header = () => (
  <header className="header" aria-label="Site header">
    <div className="container">
      <div className="header__row">
        <h1 className="header__brand">
          <Logo aria-hidden="true" className="header__logo" />

          <Link href="/" className="header__title" aria-label="Kabir Doha Cards - Home page">
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
