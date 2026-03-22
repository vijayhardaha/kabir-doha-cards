import { useState, type JSX } from 'react';

import { Tooltip as ReactTooltip } from 'react-tooltip';

import { generateBlob, triggerDownload } from '@/utils/image';
import { showToast } from '@/utils/toast';

import { ActionButtonIcon, type ActionType } from './ActionButton';

interface DownloadButtonProps {
  type?: ActionType;
}

/**
 * Downloads the rendered doha card image to the local device.
 *
 * @param {DownloadButtonProps} props - The component props.
 * @returns {JSX.Element} The rendered download actions.
 */
const DownloadButton = ({ type = 'download' }: DownloadButtonProps): JSX.Element => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async (): Promise<void> => {
    try {
      setDownloading(true);
      const blob = await generateBlob();

      if (!blob) {
        showToast('Failed: Element not found!', 'error');
        return;
      }

      triggerDownload(blob);

      setDownloaded(true);
      showToast('Image downloaded successfully!');
      setTimeout(() => setDownloaded(false), 1000);
    } catch (error) {
      console.error('Failed to download: ', error);
      showToast('Download failed, try again!', 'error');
    } finally {
      setDownloading(false);
    }
  };

  const screenReaderText = downloading
    ? 'Downloading your Doha card as an image'
    : downloaded
      ? 'Doha card successfully downloaded'
      : 'Download your Doha card as an image';

  return (
    <>
      <ReactTooltip id="download-doha-tooltip" />

      <button
        onClick={handleDownload}
        className="icon-btn"
        aria-label={screenReaderText}
        data-tooltip-id="download-doha-tooltip"
        data-tooltip-content={downloading ? 'Downloading...' : downloaded ? 'Downloaded!' : 'Download image'}
        disabled={downloading}
        aria-busy={downloading}
      >
        <ActionButtonIcon type={type} loading={downloading} done={downloaded} />
      </button>

      <button
        onClick={handleDownload}
        className="text-btn"
        aria-label={screenReaderText}
        disabled={downloading}
        aria-busy={downloading}
      >
        <ActionButtonIcon type={type} loading={downloading} done={downloaded} textBtn />
        {downloading ? 'Downloading...' : downloaded ? 'Downloaded!' : 'Download'}
      </button>
    </>
  );
};

export default DownloadButton;
