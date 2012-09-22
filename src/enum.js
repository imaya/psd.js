goog.provide('PSD.Enum');

/**
 * @enum {number}
 */
PSD.ColorMode = {
  BITMAP: 0,
  GRAYSCALE: 1,
  INDEXED_COLOR: 2,
  RGB_COLOR: 3,
  CMYK_COLOR: 4,
  MULTICHANNEL_COLOR: 7,
  DUOTONE: 8,
  LAB_COLOR: 9
};

/**
 * @enum {number}
 */
PSD.CompressionMethod = {
  RAW: 0,
  RLE: 1,
  ZIP_WITHOUT_PREDICTION: 2,
  ZIP_WITH_PREDICTION: 3
};


