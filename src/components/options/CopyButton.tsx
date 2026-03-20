import { useState, type JSX } from 'react';

import { AiOutlineCopy, AiOutlineCheck } from 'react-icons/ai';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import type { CopyButtonProps } from '@/types';
import { getBaseUrl } from '@/utils/seo';
import { showToast } from '@/utils/toast';

/**
 * CopyButton component copies the current Doha text to the clipboard.
 *
 * @component
 * @param props - The component props
 * @returns The rendered CopyButton component
 */
const CopyButton = ({ couplet, screenReaderText = 'Copy Doha' }: CopyButtonProps): JSX.Element => {
  const [isCopied, setIsCopied] = useState(false);

  /**
   * Copies the Doha couplet along with attribution to the clipboard.
   */
  const handleCopy = (): void => {
    const textToCopy = `${couplet}\n\n— संत कबीर साहेब\n\nFor more insights and wisdom, visit: ${getBaseUrl()}`;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setIsCopied(true);
        showToast('Couplet copied to clipboard!');
        setTimeout(() => setIsCopied(false), 1000);
      })
      .catch((error) => {
        console.error('Failed to copy: ', error);
        showToast('Failed to copy, try again!', 'error');
      });
  };

  return (
    <>
      <ReactTooltip id="copy-tooltip" />

      <button
        onClick={handleCopy}
        className="icon-btn"
        aria-label={isCopied ? 'Copied to clipboard' : 'Copy Doha to clipboard'}
        data-tooltip-id="copy-tooltip"
        data-tooltip-content={isCopied ? 'Copied!' : 'Copy doha to clipboard'}
      >
        {isCopied ? <AiOutlineCheck aria-hidden="true" size={24} /> : <AiOutlineCopy aria-hidden="true" size={24} />}
        <span className="sr-only">{isCopied ? 'Copied to clipboard' : screenReaderText}</span>
      </button>

      <button
        onClick={handleCopy}
        className="text-btn outlined"
        aria-label={isCopied ? 'Copied to clipboard' : 'Copy Doha to clipboard'}
      >
        {isCopied ? (
          <AiOutlineCheck aria-hidden="true" size={20} className="mr-2" />
        ) : (
          <AiOutlineCopy aria-hidden="true" size={20} className="mr-2" />
        )}
        {isCopied ? 'Copied!' : 'Copy'}
      </button>
    </>
  );
};

export default CopyButton;
