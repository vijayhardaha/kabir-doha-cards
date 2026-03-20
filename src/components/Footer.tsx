import React from 'react';

import Link from 'next/link';
import { MdArrowOutward } from 'react-icons/md';

import { SITE_TITLE_SHORT } from '@/constants/seo';
import { getShareUrl } from '@/utils/share';

/**
 * Footer component displays information about the app, details about Kabir Das, and contact information.
 * Includes sections for about the site, Kabir Das biography, contact information, and sharing options.
 *
 * @component
 * @returns {JSX.Element} The rendered footer section.
 */
const Footer = () => (
  <footer aria-labelledby="footer-heading">
    <span id="footer-heading" className="sr-only">
      Site footer with information about Kabir Doha Cards
    </span>
    {/* Top section with light stone background */}
    <div className="bg-stone-100 py-16 text-stone-800">
      <div className="main-container">
        <p className="mb-12 text-lg leading-relaxed font-medium">
          Kabir Doha Cards is an innovative platform that allows you to create beautiful and personalized Kabir Doha
          cards effortlessly. Whether for inspiration, sharing wisdom, or celebrating special occasions, our tool
          provides a simple and elegant way to craft and share these timeless pieces of wisdom.
        </p>

        <h2 className="border-primary-600 mb-4 border-l-4 pl-3 text-2xl font-bold" id="about-kabir-das">
          About Kabir Das
        </h2>
        <p className="mb-12 leading-relaxed">
          Kabir Das was a 15th-century Indian poet and saint whose verses have had a profound influence on Indian
          literature and spirituality. His poetry, written in the vernacular, addresses themes of devotion and
          mysticism, transcending religious boundaries.
          <br />
          For more detailed information, visit his Wikipedia page:{' '}
          <Link
            href="https://en.wikipedia.org/wiki/Kabir"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 inline-flex items-center underline"
            aria-label="Kabir Das on Wikipedia (opens in a new tab)"
          >
            Kabir Das on Wikipedia
            <MdArrowOutward aria-hidden="true" className="ml-1" />
            <span className="sr-only">(opens in a new tab)</span>
          </Link>
          .
        </p>

        <h3 className="border-primary-600 mb-4 border-l-4 pl-3 text-xl font-semibold" id="contact">
          Contact
        </h3>
        <p className="mb-12 leading-relaxed">
          For new projects or work opportunities, feel free to reach out to me on Twitter at{' '}
          <Link
            href="https://twitter.com/vijayhardaha"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 inline-flex items-center underline"
            aria-label="Twitter profile of @vijayhardaha (opens in a new tab)"
          >
            @vijayhardaha
            <MdArrowOutward aria-hidden="true" className="ml-1" />
            <span className="sr-only">(opens in a new tab)</span>
          </Link>{' '}
          or through PeoplePerHour at{' '}
          <Link
            href="https://pph.me/vijayhardaha"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 inline-flex items-center underline"
            aria-label="PeoplePerHour profile of vijayhardaha (opens in a new tab)"
          >
            pph.me/vijayhardaha
            <MdArrowOutward aria-hidden="true" className="ml-1" />
            <span className="sr-only">(opens in a new tab)</span>
          </Link>
          .
        </p>

        <h3 className="border-primary-600 mb-4 border-l-4 pl-3 text-xl font-semibold" id="share">
          Share
        </h3>
        <p className="leading-relaxed">
          Help spread the word about Kabir Doha Cards! Share this amazing tool with others via WhatsApp:{' '}
          <Link
            href={getShareUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 inline-flex items-center underline"
            aria-label="Share on WhatsApp (opens in a new tab)"
          >
            Share on WhatsApp
            <MdArrowOutward aria-hidden="true" className="ml-1" />
            <span className="sr-only">(opens in a new tab)</span>
          </Link>{' '}
          or via Twitter:{' '}
          <Link
            href={getShareUrl('x')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 inline-flex items-center underline"
            aria-label="Share on Twitter (opens in a new tab)"
          >
            Share on Twitter
            <MdArrowOutward aria-hidden="true" className="ml-1" />
            <span className="sr-only">(opens in a new tab)</span>
          </Link>
        </p>
      </div>
    </div>

    {/* Bottom section with dark background */}
    <div className="bg-stone-800 p-6 text-center text-white">
      <div className="main-container">
        <p className="text-sm leading-loose">
          Copyright &copy; 2024 {SITE_TITLE_SHORT}. All rights reserved.
          <br />
          Created by{' '}
          <Link
            href="https://twitter.com/vijayhardaha"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 inline-flex items-center underline"
            aria-label="Vijay Hardaha on Twitter (opens in a new tab)"
          >
            Vijay Hardaha
            <MdArrowOutward aria-hidden="true" className="ml-1" />
            <span className="sr-only">(opens in a new tab)</span>
          </Link>{' '}
          using{' '}
          <Link
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 inline-flex items-center underline"
            aria-label="Next.js website (opens in a new tab)"
          >
            Next.js
            <MdArrowOutward aria-hidden="true" className="ml-1" />
            <span className="sr-only">(opens in a new tab)</span>
          </Link>{' '}
          and{' '}
          <Link
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 inline-flex items-center underline"
            aria-label="Tailwind CSS website (opens in a new tab)"
          >
            Tailwind CSS
            <MdArrowOutward aria-hidden="true" className="ml-1" />
            <span className="sr-only">(opens in a new tab)</span>
          </Link>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
