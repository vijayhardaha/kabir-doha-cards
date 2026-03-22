import type { JSX } from 'react';

import Link from 'next/link';
import { MdArrowOutward } from 'react-icons/md';

import { SITE_CONFIG } from '@/constants/seo';
import { getShareUrl } from '@/utils/share';

/**
 * Renders the site footer with background information and outbound links.
 *
 * @returns {JSX.Element} The rendered footer.
 */
const Footer = (): JSX.Element => (
  <footer className="footer" aria-labelledby="footer-heading">
    <span id="footer-heading" className="sr-only">
      Site footer with information about Kabir Doha Cards
    </span>

    <div className="footer__top">
      <div className="container">
        <p className="footer__intro">
          Kabir Doha Cards is an innovative platform that allows you to create beautiful and personalized Kabir Doha
          cards effortlessly. Whether for inspiration, sharing wisdom, or celebrating special occasions, our tool
          provides a simple and elegant way to craft and share these timeless pieces of wisdom.
        </p>

        <h2 className="footer__section-title" id="about-kabir-das">
          About Kabir Das
        </h2>
        <p className="footer__text">
          Kabir Das was a 15th-century Indian poet and saint whose verses have had a profound influence on Indian
          literature and spirituality. His poetry, written in the vernacular, addresses themes of devotion and
          mysticism, transcending religious boundaries.
          <br />
          For more detailed information, visit his Wikipedia page:{' '}
          <Link
            href="https://en.wikipedia.org/wiki/Kabir"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
            aria-label="Kabir Das on Wikipedia (opens in a new tab)"
          >
            Kabir Das on Wikipedia
            <MdArrowOutward aria-hidden="true" className="footer__link-icon" />
            <span className="sr-only">(opens in a new tab)</span>
          </Link>
          .
        </p>

        <h3 className="footer__section-title footer__section-title--sm" id="contact">
          Contact
        </h3>
        <p className="footer__text">
          For new projects or work opportunities, feel free to reach out to me on Twitter at{' '}
          <Link
            href="https://twitter.com/vijayhardaha"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
            aria-label="Twitter profile of @vijayhardaha (opens in a new tab)"
          >
            @vijayhardaha
            <MdArrowOutward aria-hidden="true" className="footer__link-icon" />
            <span className="sr-only">(opens in a new tab)</span>
          </Link>{' '}
          or through PeoplePerHour at{' '}
          <Link
            href="https://pph.me/vijayhardaha"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
            aria-label="PeoplePerHour profile of vijayhardaha (opens in a new tab)"
          >
            pph.me/vijayhardaha
            <MdArrowOutward aria-hidden="true" className="footer__link-icon" />
            <span className="sr-only">(opens in a new tab)</span>
          </Link>
          .
        </p>

        <h3 className="footer__section-title footer__section-title--sm" id="share">
          Share
        </h3>
        <p className="footer__text">
          Help spread the word about Kabir Doha Cards! Share this amazing tool with others via WhatsApp:{' '}
          <Link
            href={getShareUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
            aria-label="Share on WhatsApp (opens in a new tab)"
          >
            Share on WhatsApp
            <MdArrowOutward aria-hidden="true" className="footer__link-icon" />
            <span className="sr-only">(opens in a new tab)</span>
          </Link>{' '}
          or via Twitter:{' '}
          <Link
            href={getShareUrl('x')}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
            aria-label="Share on Twitter (opens in a new tab)"
          >
            Share on Twitter
            <MdArrowOutward aria-hidden="true" className="footer__link-icon" />
            <span className="sr-only">(opens in a new tab)</span>
          </Link>
        </p>
      </div>
    </div>

    <div className="footer__bottom">
      <div className="container">
        <p className="footer__copyright">
          Copyright &copy; 2024 {SITE_CONFIG.name}. All rights reserved.
          <br />
          Created by{' '}
          <Link
            href="https://twitter.com/vijayhardaha"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__creator-link"
            aria-label="Vijay Hardaha on Twitter (opens in a new tab)"
          >
            Vijay Hardaha
            <MdArrowOutward aria-hidden="true" className="footer__link-icon" />
            <span className="sr-only">(opens in a new tab)</span>
          </Link>{' '}
          using{' '}
          <Link
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__creator-link"
            aria-label="Next.js website (opens in a new tab)"
          >
            Next.js
            <MdArrowOutward aria-hidden="true" className="footer__link-icon" />
            <span className="sr-only">(opens in a new tab)</span>
          </Link>{' '}
          and{' '}
          <Link
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__creator-link"
            aria-label="Tailwind CSS website (opens in a new tab)"
          >
            Tailwind CSS
            <MdArrowOutward aria-hidden="true" className="footer__link-icon" />
            <span className="sr-only">(opens in a new tab)</span>
          </Link>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
