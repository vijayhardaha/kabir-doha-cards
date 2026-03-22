import { useState, type JSX } from 'react';

import { AiOutlineCloudDownload, AiOutlineCheck } from 'react-icons/ai';
import { PiSpinnerGapLight } from 'react-icons/pi';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import { ELEMENT_ID, SCALE_FACTOR } from '@/constants/dom-to-image';
import type { DownloadButtonProps } from '@/types';
import { generateBlob, triggerDownload } from '@/utils/dom-to-image';
import { showToast } from '@/utils/toast';

const DownloadButton = ({
  elementId = ELEMENT_ID.DOHA_PREVIEW,
  scaleFactor = SCALE_FACTOR.PREVIEW,
}: DownloadButtonProps): JSX.Element => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async (): Promise<void> => {
    try {
      setDownloading(true);
      const blob = await generateBlob(elementId, scaleFactor);

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
          <PiSpinnerGapLight aria-hidden="true" size={20} className="text-btn__icon animate-spin" />
        ) : downloaded ? (
          <AiOutlineCheck aria-hidden="true" size={20} className="text-btn__icon" />
        ) : (
          <AiOutlineCloudDownload aria-hidden="true" size={20} className="text-btn__icon" />
        )}
        {downloading ? 'Downloading...' : downloaded ? 'Downloaded!' : 'Download'}
      </button>
    </>
  );
};

export default DownloadButton;
