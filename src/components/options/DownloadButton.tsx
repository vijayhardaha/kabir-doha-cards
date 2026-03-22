import { useState, type JSX } from 'react';

import { Tooltip as ReactTooltip } from 'react-tooltip';

import { showToast } from '@/utils/toast';

import { ActionButtonIcon } from './ActionButton';
import { ImageDrawer, useImageDrawer } from './ImageDrawer';

/**
 * Downloads the rendered doha card image to the local device.
 *
 * @returns {JSX.Element} The rendered download actions.
 */
const DownloadButton = (): JSX.Element => {
  const [downloaded, setDownloaded] = useState(false);
  const { blobUrl, isDrawerOpen, isDownloading, handleDownload, handleOpen, handleShare, handleClose, canShare } =
    useImageDrawer();

  const onDownloadSuccess = (): void => {
    setDownloaded(true);
    showToast('Image downloaded successfully!');
    setTimeout(() => setDownloaded(false), 1000);
  };

  const handleClick = async (): Promise<void> => {
    await handleDownload(onDownloadSuccess);
  };

  const screenReaderText = isDownloading
    ? 'Downloading your Doha card as an image'
    : downloaded
      ? 'Doha card successfully downloaded'
      : 'Download your Doha card as an image';

  return (
    <>
      <ReactTooltip id="download-doha-tooltip" />

      <button
        onClick={handleClick}
        className="icon-btn"
        aria-label={screenReaderText}
        data-tooltip-id="download-doha-tooltip"
        data-tooltip-content={isDownloading ? 'Downloading...' : downloaded ? 'Downloaded!' : 'Download image'}
        disabled={isDownloading}
        aria-busy={isDownloading}
      >
        <ActionButtonIcon type="download" loading={isDownloading} done={downloaded} />
      </button>

      <button
        onClick={handleClick}
        className="text-btn"
        aria-label={screenReaderText}
        disabled={isDownloading}
        aria-busy={isDownloading}
      >
        <ActionButtonIcon type="download" loading={isDownloading} done={downloaded} textBtn />
        {isDownloading ? 'Downloading...' : downloaded ? 'Downloaded!' : 'Download'}
      </button>

      <ImageDrawer
        blobUrl={blobUrl || ''}
        isOpen={isDrawerOpen}
        isDownloading={isDownloading}
        onClose={handleClose}
        onOpen={handleOpen}
        onShare={handleShare}
        canShare={canShare}
      />
    </>
  );
};

export default DownloadButton;
