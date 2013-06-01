/**
 * @constructor
 */
var AdditionalLayerInfo = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {string} */
  this.signature;
  /** @type {string} */
  this.key;
  /** @type {!(Array.<number>|Uint8Array)} */
  this.data;
  /** @type {{parse: function(StreamReader, number, Header)}} */
  this.info;
};

/**
 * @param {StreamReader} stream
 * @param {Header} header
 */
AdditionalLayerInfo.prototype.parse = function(stream, header) {
  /** @type {number} */
  var length;

  this.offset = stream.tell();
  this.signature = stream.readString(4);
  this.key = stream.readString(4);
  length = stream.readUint32();
  this.length = length + 12;

  // 実装されている key の場合はパースを行う
  // 各 key の実装は AdditionaLayerInfo ディレクトリにある
  if (typeof AdditionalLayerInfo[this.key] === 'function') {
    this.info = new (AdditionalLayerInfo[this.key])();
    this.info.parse(stream, length, header);
  } else {
    console.log('additional layer information: not implemented', this.key);
  }

  // error check
  if (stream.tell() - (this.offset + this.length) !== 0) {
    if (!COMPILED) {
      //   console.log(stream.fetch(stream.tell(), (this.offset + this.length)), this.offset + this.length);
      console.log(this.key, stream.tell() - (this.offset + this.length));
    }
  }

  stream.seek(this.offset + this.length, 0);
};

module.exports = AdditionalLayerInfo;
