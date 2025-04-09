const PALETTE = {
  PURPLE: {
    ULTRA_LIGHT: "#efebff",
    VERY_LIGHT: "#c1b4fc",
    LIGHT: "#ab94fe",
    STANDARD: "#7a5eff",
    DARK: "#5e42e3",
  },
  BLUE: {
    ULTRA_LIGHT: "#d2e6fc",
    VERY_LIGHT: "#82befa",
    LIGHT: "#559cfa",
    STANDARD: "#207bfa",
    DARK: "#024ed1",
  },
};

export const COLOR = {
  BACKGROUND: {
    STANDARD: "#ffffff",
    HIGHLIGHT: PALETTE.BLUE.STANDARD,
    CODE: "#C1BACC44",
    REVERSE: "#000000",
  },
  BORDER: {
    STANDARD: "#484561",
    LIGHT: "#C1BACC",
    DARK: "#000",
    HIGHLIGHT: PALETTE.BLUE.STANDARD,
    CODE: "#C1BACC",
  },
  TEXT: {
    STANDARD: "#000000",
    LIGHT: "#C1BACC",
    LITTLE_LIGHT: "#504e66",
    REVERSE: "#f8f7f9",
    LINK: PALETTE.BLUE.STANDARD,
    TAG: PALETTE.BLUE.STANDARD,
  },

  PRIMARY: { ...PALETTE.BLUE },
  SECONDARY: { ...PALETTE.PURPLE },
};
