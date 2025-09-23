import type { CSSProperties } from 'react';

type SafeAreaSide = 'top' | 'right' | 'bottom' | 'left';

export const safeAreaInset = (side: SafeAreaSide, base = 0): string => {
  return `calc(${base}px + env(safe-area-inset-${side}))`;
};

export const safeAreaPadding = (
  insets: Partial<Record<SafeAreaSide, number>>
): CSSProperties => {
  const style: CSSProperties = {};

  if (insets.top !== undefined) {
    style.paddingTop = safeAreaInset('top', insets.top);
  }

  if (insets.right !== undefined) {
    style.paddingRight = safeAreaInset('right', insets.right);
  }

  if (insets.bottom !== undefined) {
    style.paddingBottom = safeAreaInset('bottom', insets.bottom);
  }

  if (insets.left !== undefined) {
    style.paddingLeft = safeAreaInset('left', insets.left);
  }

  return style;
};

export const mergeSafeAreaStyles = (
  base: CSSProperties,
  insets: Partial<Record<SafeAreaSide, number>>
): CSSProperties => ({
  ...base,
  ...safeAreaPadding(insets)
});
