'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
  useMemo,
  type ReactNode,
  type JSX,
} from 'react';

import { createPortal } from 'react-dom';

import { cn } from '@/utils/classnames';

type DrawerDirection = 'bottom' | 'right';

interface DrawerContextValue {
  close: () => void;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

/**
 * Returns the animated close handler from the nearest Drawer ancestor.
 *
 * @returns {DrawerContextValue} The drawer context with the close function.
 * @throws {Error} When called outside a Drawer tree.
 */
const useDrawerClose = (): DrawerContextValue => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawerClose must be used within <Drawer>');
  }
  return context;
};

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  direction: DrawerDirection;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  ariaLabelledBy?: string;
}

/**
 * Portal-based reusable drawer with overlay, outside-click dismissal,
 * Escape key handling, body scroll locking, and slide animations.
 * Renders into document.body via createPortal so it can be used anywhere.
 *
 * @param {DrawerProps} props - The drawer props.
 * @returns {JSX.Element | null} The portaled drawer or null when closed/SSR.
 */
const Drawer = ({
  open,
  onClose,
  direction,
  className,
  children,
  ariaLabel,
  ariaLabelledBy,
}: DrawerProps): JSX.Element | null => {
  const containerRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);

  const handleClose = useCallback((): void => {
    if (closingRef.current) return;

    const content = containerRef.current?.querySelector<HTMLElement>('[data-drawer-content]');
    if (!content) {
      onClose();
      return;
    }

    closingRef.current = true;
    content.classList.add('drawer--closing');
    content.addEventListener(
      'animationend',
      () => {
        closingRef.current = false;
        onClose();
      },
      { once: true }
    );
  }, [onClose]);

  useLayoutEffect(() => {
    if (open) {
      closingRef.current = false;
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent): void => {
      const content = containerRef.current?.querySelector<HTMLElement>('[data-drawer-content]');
      if (content && !content.contains(event.target as Node)) {
        handleClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, handleClose]);

  const value = useMemo(() => ({ close: handleClose }), [handleClose]);

  if (!open || typeof window === 'undefined') return null;

  return createPortal(
    <DrawerContext.Provider value={value}>
      <div ref={containerRef} className="drawer">
        <div className="drawer__overlay" aria-hidden="true" />
        <div
          data-drawer-content
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          className={cn(`drawer__content drawer__content--${direction}`, className)}
        >
          {children}
        </div>
      </div>
    </DrawerContext.Provider>,
    document.body
  );
};

export { Drawer, useDrawerClose };
export type { DrawerDirection };
