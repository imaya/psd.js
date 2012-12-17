goog.provide('PSD.AdditionalLayerInfo.Patt');

goog.require('PSD.AdditionalLayerInfo');

goog.scope(function() {

/**
 * @constructor
 */
PSD.AdditionalLayerInfo['Patt'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  // TODO: pattern は専用のオブジェクト化する
  /** @type {Array.<Object>} */
  this.pattern;
};

/**
 * @param {PSD.StreamReader} stream
 * @param {number} length
 * @param {PSD.Header} header
 */
PSD.AdditionalLayerInfo['Patt'].prototype.parse = function(stream, length, header) {
  /** @type {number} */
  var limit = stream.tell() + length;
  /** @type {number} */
  var patternLength;
  /** @type {number} */
  var version;
  /** @type {number} */
  var mode;
  /** @type {number} */
  var vertical;
  /** @type {number} */
  var horizontal;
  /** @type {string} */
  var name;
  /** @type {string} */
  var id;
  /** @type {!(Array.<number>|Uint8Array)} */
  var colorTable;
  /** @type {*} TODO */
  var patternData;

  this.offset = stream.tell();

  // TODO
  // 現在 Patt は長さが 0 のものしか見つかっていない
  // 実際に動作するかどうかは確認する必要がある
  while (stream.tell() < limit) {
    patternLength = stream.readUint32();
    version = stream.readUint32();
    mode = stream.readInt32();
    vertical = stream.readInt16(); // TODO: 確認
    horizontal = stream.readInt16(); // TODO: 確認
    name = stream.readWideString(stream.readUint32());
    id = stream.readPascalString();

    if (header.colorMode === PSD.ColorMode.INDEXED_COLOR) {
      colorTable = stream.read(256*3);
    }

    // TODO: 現在は何もしていない, Virtural Memory Array List
    patternData = stream.read(limit - this.offset);
  }

  this.length = stream.tell() - this.offset;
};


// end of scope
});
