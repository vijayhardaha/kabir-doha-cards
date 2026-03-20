import { useRef, useEffect, useState, type JSX } from 'react';

import { TfiReload } from 'react-icons/tfi';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import type { RandomButtonProps } from '@/types';
import { cn } from '@/utils/classnames';
import fetchCouplets from '@/utils/fetchCouplets';
import { showToast } from '@/utils/toast';

const ANIMATION_DURATION = 150;

const RandomButton = ({ options, updateOptions }: RandomButtonProps): JSX.Element => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isPressedRef = useRef(false);
  const isHoveredRef = useRef(false);

  const state = useRef({
    angle: 0,
    scale: 1,
    targetAngle: 0,
    targetScale: 1,
    startAngle: 0,
    startScale: 1,
    animStartTime: 0,
    lastTime: 0,
    animId: null as number | null,
  });

  useEffect(() => {
    isPressedRef.current = isPressed;
  }, [isPressed]);

  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    const animate = (timestamp: number): void => {
      const s = state.current;

      if (s.lastTime === 0) {
        s.lastTime = timestamp;
        s.animStartTime = timestamp;
      }

      const elapsed = timestamp - s.animStartTime;
      const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);

      s.angle = s.startAngle + (s.targetAngle - s.startAngle) * easeOut;
      s.scale = s.startScale + (s.targetScale - s.startScale) * easeOut;

      if (buttonRef.current) {
        buttonRef.current.style.transform = `scale(${s.scale.toFixed(3)}) rotate(${s.angle.toFixed(1)}deg) translateZ(0px)`;
      }

      if (progress < 1) {
        s.animId = requestAnimationFrame(animate);
        s.lastTime = timestamp;
      } else {
        s.angle = s.targetAngle;
        s.scale = s.targetScale;
        s.animId = null;
        s.lastTime = 0;

        if (isPressedRef.current) {
          setIsPressed(false);
        }
      }
    };

    const startAnimation = (targetAngle: number, targetScale: number): void => {
      const s = state.current;
      s.startAngle = s.angle;
      s.startScale = s.scale;
      s.targetAngle = targetAngle;
      s.targetScale = targetScale;
      s.lastTime = 0;

      if (s.animId) {
        cancelAnimationFrame(s.animId);
      }
      s.animId = requestAnimationFrame(animate);
    };

    const handleMouseEnter = (): void => {
      setIsHovered(true);
      if (isPressedRef.current) return;
      startAnimation(-15, 1.1);
    };

    const handleMouseLeave = (): void => {
      setIsHovered(false);
      if (isPressedRef.current) return;
      startAnimation(0, 1);
    };

    const handleMouseDown = (): void => {
      setIsPressed(true);
      startAnimation(360, 0.9);
    };

    const handleMouseUp = (): void => {
      setIsPressed(true);
      const targetAngle = isHoveredRef.current ? -15 : 0;
      const targetScale = isHoveredRef.current ? 1.1 : 1;
      startAnimation(targetAngle, targetScale);
    };

    const button = buttonRef.current;

    if (!button) return;

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mousedown', handleMouseDown);
    button.addEventListener('mouseup', handleMouseUp);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('mousedown', handleMouseDown);
      button.removeEventListener('mouseup', handleMouseUp);
    };
  }, [options.loading]);

  const handleClick = async (): Promise<void> => {
    if (options.loading) return;

    updateOptions({ loading: true });

    const { data, error } = await fetchCouplets('random');

    if (error) {
      console.error(error);
      showToast(error, 'error');
      updateOptions({ loading: false });
    } else if (data && data.length > 0) {
      updateOptions({ couplet: data[0], loading: false });
    } else {
      console.warn('No results found for random Doha.');
      showToast('No Doha found, try again!', 'error');
      updateOptions({ loading: false });
    }
  };

  return (
    <>
      <ReactTooltip id="random-doha-tooltip" />

      <button
        ref={buttonRef}
        onClick={handleClick}
        className={cn('random-btn', { 'random-btn--loading': options.loading })}
        aria-label="Get Random Doha"
        data-tooltip-id="random-doha-tooltip"
        data-tooltip-content="Get a random Doha"
      >
        <TfiReload aria-hidden="true" size={30} />
        <span className="sr-only">Get Random Doha</span>
      </button>
    </>
  );
};

export default RandomButton;
