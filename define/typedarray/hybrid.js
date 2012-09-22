/**
 * defines
 */

goog.provide('USE_TYPEDARRAY');

// Safari が typeof Uint8Array === 'object' になるため、
// 未定義か否かで Typed Array の使用を決定する

/** @const {number} use typed array flag. */
var USE_TYPEDARRAY = (
  goog.global['Uint8Array'] !== void 0 &&
  goog.global['Uint16Array'] !== void 0 &&
  goog.global['Uint32Array'] !== void 0
);
