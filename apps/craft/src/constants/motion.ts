export const bounceTransition = {
  type: "spring" as const,
  stiffness: 500,
  damping: 15,
};

export const tapAnimation = {
  small: { scaleX: 1.1, scaleY: 0.85 },
  medium: { scaleX: 1.05, scaleY: 0.95 },
  wide: { scaleX: 1.02, scaleY: 0.98 },
  large: { scaleX: 1.01, scaleY: 0.99 },
};
