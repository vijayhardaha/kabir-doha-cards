import { useState, type JSX } from 'react';

import domtoimage from 'dom-to-image';
import { AiOutlineCloudDownload, AiOutlineCheck } from 'react-icons/ai';
import { PiSpinnerGapLight } from 'react-icons/pi';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import type { DownloadButtonProps } from '@/types';
import { extractExtensionFromBase64, generateUniqueId } from '@/utils/download';
import { showToast } from '@/utils/toast';

/**
 * DownloadButton component triggers the download of the Doha card as an image.
 *
 * @component
 * @param props - Component props
 * @returns The rendered download button component
 */
const DownloadButton = ({
  elementId = 'doha-preview',
  fileNamePrefix = 'kabir-doha-card',
  scaleFactor = 6,
  quality = 0.75,
}: DownloadButtonProps): JSX.Element => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  /**
   * Handles the download of the Doha card as an image.
   */
  const handleDownload = (): void => {
    const node = document.getElementById(elementId);

    if (node) {
      setDownloading(true);
      const rect = node.getBoundingClientRect();
      const width = rect.width * scaleFactor;
      const height = rect.height * scaleFactor;

      const options = {
        width,
        height,
        quality,
        style: { transform: `scale(${scaleFactor})`, transformOrigin: 'top left' },
      };

      domtoimage
        .toJpeg(node, options)
        .then((dataUrl: string) => {
          const extension = extractExtensionFromBase64(dataUrl);
          const uniqueId = generateUniqueId();
          const link = document.createElement('a');
          link.download = `${fileNamePrefix}-${uniqueId}.${extension}`;
          link.href = dataUrl;
          link.click();
          setDownloaded(true);
          setDownloading(false);
          showToast('Image downloaded successfully!');
          setTimeout(() => setDownloaded(false), 1000);
        })
        .catch((error: Error) => {
          console.error('Failed to download: ', error);
          showToast('Download failed, try again!', 'error');
          setDownloading(false);
        });
    } else {
      console.error(`Element with id '${elementId}' not found.`);
      showToast('Failed: Element not found!', 'error');
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
        {downloading ? (
          <PiSpinnerGapLight aria-hidden="true" size={24} className="animate-spin" />
        ) : downloaded ? (
          <AiOutlineCheck aria-hidden="true" size={24} />
        ) : (
          <AiOutlineCloudDownload aria-hidden="true" size={24} />
        )}
        <span className="sr-only">{screenReaderText}</span>
      </button>

      <button
        onClick={handleDownload}
        className="text-btn"
        aria-label={screenReaderText}
        disabled={downloading}
        aria-busy={downloading}
      >
        {downloading ? (
          <PiSpinnerGapLight aria-hidden="true" size={20} className="mr-2 animate-spin" />
        ) : downloaded ? (
          <AiOutlineCheck aria-hidden="true" size={20} className="mr-2" />
        ) : (
          <AiOutlineCloudDownload aria-hidden="true" size={20} className="mr-2" />
        )}
        {downloading ? 'Downloading...' : downloaded ? 'Downloaded!' : 'Download'}
      </button>
    </>
  );
};

export default DownloadButton;
