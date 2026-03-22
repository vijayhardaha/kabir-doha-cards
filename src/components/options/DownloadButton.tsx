import { useCallback, useState, type JSX } from 'react';

import { Tooltip as ReactTooltip } from 'react-tooltip';

import { useImageDownload } from '@/hooks/useImageDownload';
import { showToast } from '@/utils/toast';

import { ActionButtonIcon } from './ActionButton';
import { ImageDrawer } from './ImageDrawer';

/**
 * Downloads the rendered doha card image to the local device.
 *
 * @returns {JSX.Element} The rendered download actions.
 */
const DownloadButton = (): JSX.Element => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const download = useImageDownload();

  const onDownloadSuccess = (): void => {
    setDownloaded(true);
    showToast('Image downloaded successfully!');
    setTimeout(() => setDownloaded(false), 1000);
  };

  const handleClick = async (): Promise<void> => {
    await download.handleDownload(() => setIsDrawerOpen(true), onDownloadSuccess);
  };

  const closeDrawer = useCallback((): void => {
    download.releaseBlobUrl();
    setIsDrawerOpen(false);
  }, [download]);

  const screenReaderText = download.isDownloading
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
        data-tooltip-content={download.isDownloading ? 'Downloading...' : downloaded ? 'Downloaded!' : 'Download image'}
        disabled={download.isDownloading}
        aria-busy={download.isDownloading}
      >
        <ActionButtonIcon type="download" loading={download.isDownloading} done={downloaded} />
      </button>

      <button
        onClick={handleClick}
        className="text-btn"
        aria-label={screenReaderText}
        disabled={download.isDownloading}
        aria-busy={download.isDownloading}
      >
        <ActionButtonIcon type="download" loading={download.isDownloading} done={downloaded} textBtn />
        {download.isDownloading ? 'Downloading...' : downloaded ? 'Downloaded!' : 'Download'}
      </button>

      <ImageDrawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        blobUrl={download.blobUrl}
        canShare={download.canShare}
        isSharing={download.isSharing}
        onOpen={download.handleOpen}
        onShare={download.handleShare}
      />
    </>
  );
};

export default DownloadButton;
