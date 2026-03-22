import { useState, type JSX } from 'react';

import { Tooltip as ReactTooltip } from 'react-tooltip';

import { generateBlob } from '@/utils/image';
import { showToast } from '@/utils/toast';

import { ActionButtonIcon, type ActionType } from './ActionButton';

interface CopyButtonProps {
  type?: ActionType;
}

/**
 * Copies the rendered doha card image to the clipboard.
 *
 * @param {CopyButtonProps} props - The component props.
 * @returns {JSX.Element} The rendered copy actions.
 */
const CopyButton = ({ type = 'copy' }: CopyButtonProps): JSX.Element => {
  const [copying, setCopying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (): Promise<void> => {
    try {
      setCopying(true);
      const blob = await generateBlob();

      if (!blob) {
        showToast('Failed: Element not found!', 'error');
        return;
      }

      // ClipboardItem preserves image mime type so paste targets receive an actual image.
      const clipboardItem = new ClipboardItem({ [blob.type]: blob });
      await navigator.clipboard.write([clipboardItem]);

      setIsCopied(true);
      showToast('Image copied to clipboard!');
      setTimeout(() => setIsCopied(false), 1000);
    } catch (error) {
      console.error('Failed to copy: ', error);
      showToast('Failed to copy, try again!', 'error');
    } finally {
      setCopying(false);
    }
  };

  const screenReaderText = copying
    ? 'Copying image to clipboard'
    : isCopied
      ? 'Image copied to clipboard'
      : 'Copy image to clipboard';

  return (
    <>
      <ReactTooltip id="copy-tooltip" />

      <button
        onClick={handleCopy}
        className="icon-btn"
        aria-label={screenReaderText}
        data-tooltip-id="copy-tooltip"
        data-tooltip-content={copying ? 'Copying...' : isCopied ? 'Copied!' : 'Copy image to clipboard'}
        disabled={copying}
        aria-busy={copying}
      >
        <ActionButtonIcon type={type} loading={copying} done={isCopied} />
      </button>

      <button
        onClick={handleCopy}
        className="text-btn outlined"
        aria-label={screenReaderText}
        disabled={copying}
        aria-busy={copying}
      >
        <ActionButtonIcon type={type} loading={copying} done={isCopied} textBtn />
        {copying ? 'Copying...' : isCopied ? 'Copied!' : 'Copy'}
      </button>
    </>
  );
};

export default CopyButton;
