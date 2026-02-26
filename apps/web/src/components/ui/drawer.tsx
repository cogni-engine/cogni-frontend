'use client';

import * as React from 'react';
import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useDrag } from '@use-gesture/react';
import { cn } from '@/lib/utils';
import { useGlobalUIStore } from '@/stores/useGlobalUIStore';

// ============================================================================
// Drawer Context
// ============================================================================

interface DrawerContextValue {
  isOpen: boolean;
  onClose: () => void;
  dragOffset: number;
  setDragOffset: (offset: number) => void;
  drawerRef: React.RefObject<HTMLDivElement | null>;
  scrollableRef: React.RefObject<HTMLDivElement | null>;
}

const DrawerContext = createContext<DrawerContextValue | undefined>(undefined);

function useDrawerContext() {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('Drawer components must be used within a Drawer');
  }
  return context;
}

// ============================================================================
// Drawer Root
// ============================================================================

interface DrawerProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Root drawer component that provides context and manages state
 *
 * @example
 * ```tsx
 * <Drawer open={isOpen} onOpenChange={setIsOpen}>
 *   <DrawerContent>
 *     <DrawerHandle />
 *     <DrawerHeader>
 *       <DrawerTitle>My Drawer</DrawerTitle>
 *     </DrawerHeader>
 *     <DrawerBody>Content here</DrawerBody>
 *   </DrawerContent>
 * </Drawer>
 * ```
 */
function Drawer({ children, open, onOpenChange }: DrawerProps) {
  const setDrawerOpen = useGlobalUIStore(state => state.setDrawerOpen);
  const [dragOffset, setDragOffset] = useState(0);
  const drawerRef = useRef<HTMLDivElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);

  // Handle body scroll lock and global UI state
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setDrawerOpen(true);
    } else {
      document.body.style.overflow = 'unset';
      setDrawerOpen(false);
      setDragOffset(0);
    }
    return () => {
      document.body.style.overflow = 'unset';
      setDrawerOpen(false);
    };
  }, [open, setDrawerOpen]);

  const handleClose = React.useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  if (!open) return null;

  return (
    <DrawerContext.Provider
      value={{
        isOpen: open,
        onClose: handleClose,
        dragOffset,
        setDragOffset,
        drawerRef,
        scrollableRef,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

// ============================================================================
// Drawer Overlay (Backdrop)
// ============================================================================

interface DrawerOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Z-index for the overlay. Defaults to 50 */
  zIndex?: number;
}

const DrawerOverlay = React.forwardRef<HTMLDivElement, DrawerOverlayProps>(
  ({ className, zIndex = 50, ...props }, ref) => {
    const { onClose } = useDrawerContext();

    return (
      <div
        ref={ref}
        className={cn(
          'fixed inset-0 bg-dialog-overlay backdrop-blur-sm animate-in fade-in-0',
          className
        )}
        style={{ zIndex }}
        onClick={onClose}
        {...props}
      />
    );
  }
);
DrawerOverlay.displayName = 'DrawerOverlay';

// ============================================================================
// Drawer Content
// ============================================================================

interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Z-index for the drawer content. Defaults to 60 */
  zIndex?: number;
  /** Maximum height of the drawer. Defaults to '85vh' */
  maxHeight?: string;
  /** Fixed height of the drawer. If provided, overrides maxHeight */
  height?: string;
  /** Enable swipe-to-close gesture. Defaults to true */
  swipeToClose?: boolean;
  /** Swipe distance threshold to trigger close (in pixels). Defaults to 100 */
  swipeThreshold?: number;
  /** Velocity threshold to trigger close. Defaults to 0.5 */
  velocityThreshold?: number;
}

const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  (
    {
      className,
      children,
      zIndex = 100,
      maxHeight = '85vh',
      height,
      swipeToClose = true,
      swipeThreshold = 100,
      velocityThreshold = 0.5,
      ...props
    },
    ref
  ) => {
    const { onClose, dragOffset, setDragOffset, drawerRef, scrollableRef } =
      useDrawerContext();

    // Track if we should allow swipe (only when scrollable content is at top)
    const isDraggingRef = useRef(false);

    // Merge refs
    const mergedRef = React.useMemo(() => {
      return (node: HTMLDivElement | null) => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        if (drawerRef) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (drawerRef as any).current = node;
        }
      };
    }, [ref, drawerRef]);

    // Swipe-to-close gesture
    const bind = useDrag(
      ({
        first,
        last,
        movement: [, my],
        velocity: [, vy],
        direction: [, dy],
        cancel,
      }) => {
        if (!swipeToClose) return;

        // On drag start, check if scrollable content is at top
        if (first) {
          const scrollableEl = scrollableRef?.current;
          const isAtTop = !scrollableEl || scrollableEl.scrollTop <= 0;

          // Only allow swipe if content is at top
          if (!isAtTop) {
            cancel();
            return;
          }
          isDraggingRef.current = true;
        }

        // Only process if we're in a valid drag state
        if (!isDraggingRef.current) return;

        // Only allow downward swipes
        if (my > 0) {
          if (last) {
            isDraggingRef.current = false;
            // Close if swiped down past threshold or fast swipe down
            if (my > swipeThreshold || (vy > velocityThreshold && dy > 0)) {
              onClose();
              setDragOffset(0);
            } else {
              // Snap back
              setDragOffset(0);
            }
          } else {
            // Update drag offset during the drag
            setDragOffset(my);
          }
        } else if (last) {
          isDraggingRef.current = false;
        }
      },
      {
        axis: 'y',
        filterTaps: true,
        bounds: { top: 0 },
        rubberband: true,
      }
    );

    return (
      <>
        <DrawerOverlay zIndex={zIndex} />
        <div
          ref={mergedRef}
          className={cn(
            'fixed inset-x-0 bottom-0 flex flex-col z-110',
            'bg-drawer-bg dark:backdrop-blur-sm border border-border-default',
            'shadow-card',
            'rounded-t-3xl',
            'animate-[slide-up_0.3s_ease-out]',
            className
          )}
          style={{
            zIndex,
            ...(height ? { height } : { maxHeight }),
            transform: `translateY(${dragOffset}px)`,
            transition: dragOffset === 0 ? 'transform 0.2s ease-out' : 'none',
          }}
          {...(swipeToClose ? bind() : {})}
          {...props}
        >
          {children}
        </div>
      </>
    );
  }
);
DrawerContent.displayName = 'DrawerContent';

// ============================================================================
// Drawer Handle (Drag indicator)
// ============================================================================

type DrawerHandleProps = React.HTMLAttributes<HTMLDivElement>;

const DrawerHandle = React.forwardRef<HTMLDivElement, DrawerHandleProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'pt-2 pb-1 cursor-grab active:cursor-grabbing touch-none',
          className
        )}
        {...props}
      >
        <div className='w-12 h-1 bg-drawer-handle rounded-full mx-auto' />
      </div>
    );
  }
);
DrawerHandle.displayName = 'DrawerHandle';

// ============================================================================
// Drawer Header
// ============================================================================

type DrawerHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-between px-4 py-3 border-b border-border-default',
          className
        )}
        {...props}
      />
    );
  }
);
DrawerHeader.displayName = 'DrawerHeader';

// ============================================================================
// Drawer Title
// ============================================================================

type DrawerTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

const DrawerTitle = React.forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn('text-lg font-semibold text-text-primary', className)}
        {...props}
      />
    );
  }
);
DrawerTitle.displayName = 'DrawerTitle';

// ============================================================================
// Drawer Body
// ============================================================================

type DrawerBodyProps = React.HTMLAttributes<HTMLDivElement>;

const DrawerBody = React.forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ className, ...props }, ref) => {
    const { scrollableRef } = useDrawerContext();

    // Merge refs
    const mergedRef = React.useMemo(() => {
      return (node: HTMLDivElement | null) => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        if (scrollableRef) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (scrollableRef as any).current = node;
        }
      };
    }, [ref, scrollableRef]);

    return (
      <div
        ref={mergedRef}
        className={cn('flex-1 overflow-y-auto p-4', className)}
        {...props}
      />
    );
  }
);
DrawerBody.displayName = 'DrawerBody';

// ============================================================================
// Drawer Footer
// ============================================================================

type DrawerFooterProps = React.HTMLAttributes<HTMLDivElement>;

const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-end gap-2 px-4 py-3 border-t border-border-default',
          className
        )}
        {...props}
      />
    );
  }
);
DrawerFooter.displayName = 'DrawerFooter';

// ============================================================================
// Drawer Close Button
// ============================================================================

type DrawerCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const DrawerClose = React.forwardRef<HTMLButtonElement, DrawerCloseProps>(
  ({ className, onClick, ...props }, ref) => {
    const { onClose } = useDrawerContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      onClose();
    };

    return (
      <button
        ref={ref}
        type='button'
        className={cn(
          'p-2 hover:bg-interactive-hover rounded-full transition-colors',
          className
        )}
        onClick={handleClick}
        {...props}
      />
    );
  }
);
DrawerClose.displayName = 'DrawerClose';

// ============================================================================
// Exports
// ============================================================================

export {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
  useDrawerContext,
};

export type {
  DrawerProps,
  DrawerContentProps,
  DrawerOverlayProps,
  DrawerHandleProps,
  DrawerHeaderProps,
  DrawerTitleProps,
  DrawerBodyProps,
  DrawerFooterProps,
  DrawerCloseProps,
};
