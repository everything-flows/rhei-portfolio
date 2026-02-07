export const bounceTransition = {
  type: "spring" as const,
  stiffness: 500,
  damping: 15,
};

// Tap animations - 요소 크기에 따라 다른 강도 사용
export const tapAnimation = {
  // 작은 요소 (버튼, 태그, 페이지네이션)
  small: { scaleX: 1.1, scaleY: 0.85 },
  // 중간 요소 (카드)
  medium: { scaleX: 1.05, scaleY: 0.95 },
  // 넓은 요소 (타이틀 영역)
  wide: { scaleX: 1.02, scaleY: 0.98 },
  // 가장 큰 요소 (전체 카드)
  large: { scaleX: 1.01, scaleY: 0.99 },
};
