import { type JSX } from 'react';

import { AiOutlineCheck, AiOutlineCloudDownload, AiOutlineCopy } from 'react-icons/ai';
import { PiSpinnerGapLight } from 'react-icons/pi';

import { cn } from '@/utils/classnames';

type ActionType = 'download' | 'copy';

interface ActionButtonIconProps {
  type: ActionType;
  loading: boolean;
  done: boolean;
  textBtn?: boolean;
}

const ActionButtonIcon = ({ type, loading, done, textBtn = false }: ActionButtonIconProps): JSX.Element => {
  const size = textBtn ? 20 : 24;
  const iconClass = textBtn ? 'text-btn__icon' : '';

  if (loading) {
    return <PiSpinnerGapLight aria-hidden="true" size={size} className={cn(iconClass, 'animate-spin')} />;
  }

  if (done) {
    return <AiOutlineCheck aria-hidden="true" size={size} className={iconClass} />;
  }

  const Icon = type === 'download' ? AiOutlineCloudDownload : AiOutlineCopy;
  return <Icon aria-hidden="true" size={size} className={iconClass} />;
};

export { ActionButtonIcon };
export type { ActionType };
