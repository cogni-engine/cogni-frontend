import { useEffect, useState, useCallback, useRef, RefObject } from 'react';

interface UseMobileToolbarPositionReturn {
  viewportHeight: number;
  toolbarTop: number | null;
  toolbarRef: RefObject<HTMLDivElement | null>;
}

export function useMobileToolbarPosition(): UseMobileToolbarPositionReturn {
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== 'undefined'
      ? (window.visualViewport?.height ?? window.innerHeight)
      : 800
  );
  const [toolbarTop, setToolbarTop] = useState<number | null>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const updateToolbarPosition = useCallback(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const vh = vv.height;
    const offsetTop = vv.offsetTop;
    const toolbarHeight = toolbarRef.current?.offsetHeight || 60;

    // Position toolbar at the bottom of the visual viewport
    // This accounts for both keyboard AND Safari's viewport scrolling
    const topPosition = offsetTop + vh - toolbarHeight;

    setViewportHeight(vh);
    setToolbarTop(topPosition);

    console.log('[MobileToolbar] updatePosition:', {
      visualViewportHeight: vh,
      offsetTop,
      toolbarHeight,
      topPosition,
    });
  }, []);

  // Track viewport height and scroll changes (for virtual keyboard + Safari viewport scroll)
  useEffect(() => {
    // Initial position
    updateToolbarPosition();

    window.visualViewport?.addEventListener('resize', updateToolbarPosition);
    window.visualViewport?.addEventListener('scroll', updateToolbarPosition);

    return () => {
      window.visualViewport?.removeEventListener(
        'resize',
        updateToolbarPosition
      );
      window.visualViewport?.removeEventListener(
        'scroll',
        updateToolbarPosition
      );
    };
  }, [updateToolbarPosition]);

  return { viewportHeight, toolbarTop, toolbarRef };
}
