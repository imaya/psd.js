goog.provide('PSD.StreamReader');

goog.scope(function() {

/**
 * ByteArray Reader.
 * @param {!(Array.<number>|Uint8Array)} input input buffer.
 * @param {number=} opt_start start position.
 * @constructor
 */
PSD.StreamReader = function(input, opt_start) {
  /** @type {!(Array.<number>|Uint8Array)} */
  this.input = USE_TYPEDARRAY ? new Uint8Array(input) : input;
  /** @type {number} */
  this.ip = opt_start | 0;
}

/**
 * @return {number}
 */
PSD.StreamReader.prototype.readUint32 = function() {
  return (
    (this.input[this.ip++] << 24) | (this.input[this.ip++] << 16) |
    (this.input[this.ip++] <<  8) | (this.input[this.ip++]      )
  ) >>> 0;
};

/**
 * @return {number}
 */
PSD.StreamReader.prototype.readInt32 = function() {
  return (
    (this.input[this.ip++] << 24) | (this.input[this.ip++] << 16) |
    (this.input[this.ip++] <<  8) | (this.input[this.ip++]      )
  );
};

/**
 * @return {number}
 */
PSD.StreamReader.prototype.readUint16 = function() {
  return (this.input[this.ip++] << 8) | this.input[this.ip++];
};

/**
 * @return {number}
 */
PSD.StreamReader.prototype.readInt16 = function() {
  return ((this.input[this.ip++] << 8) | this.input[this.ip++]) << 16 >> 16;
};

/**
 * @return {number}
 */
PSD.StreamReader.prototype.readUint8 = function() {
  return this.input[this.ip++];
};

/**
 * @return {number}
 */
PSD.StreamReader.prototype.readInt8 = function() {
  return this.input[this.ip++] << 24 >> 24;
};

/**
 * @param {number} length
 * @return {!(Array.<number>|Uint8Array)}
 */
PSD.StreamReader.prototype.read = function(length) {
  return USE_TYPEDARRAY ?
    this.input.subarray(this.ip, this.ip += length) :
    this.input.slice(this.ip, this.ip += length);
};

/**
 * @param {number} start start position.
 * @param {number} end end position.
 * @return {!(Array.<number>|Uint8Array)}
 */
PSD.StreamReader.prototype.slice = function(start, end) {
  this.ip = end;
  return USE_TYPEDARRAY ?
    this.input.subarray(start, end) : this.input.slice(start, end);
};

/**
 * @param {number} start start position.
 * @param {number} end end position.
 * @return {!(Array.<number>|Uint8Array)}
 */
PSD.StreamReader.prototype.fetch = function(start, end) {
  return USE_TYPEDARRAY ?
    this.input.subarray(start, end) : this.input.slice(start, end);
};

/**
 * @param {number} length read length.
 * @return {string}
 */
PSD.StreamReader.prototype.readString = function(length) {
  /** @type {!(Array.<number>|Uint8Array)} */
  var input = this.input;
  /** @type {number} */
  var ip = this.ip;
  /** @type {Array.<string>} */
  var charArray = [];
  /** @type {number} */
  var i;

  for (i = 0; i < length; ++i) {
    charArray[i] = String.fromCharCode(input[ip++]);
  }

  this.ip = ip;

  return charArray.join('');
};

/**
 * @return {string}
 */
PSD.StreamReader.prototype.readPascalString = function() {
  return this.readString(this.input[this.ip++]);
};

/**
 * @return {number}
 */
PSD.StreamReader.prototype.tell = function() {
  return this.ip;
};

/**
 * @param {number} pos position.
 * @param {number=} opt_base base position.
 */
PSD.StreamReader.prototype.seek = function(pos, opt_base) {
  if (typeof opt_base !== 'number') {
    opt_base = this.ip;
  }
  this.ip = opt_base + pos;
};

/**
 * @param {number} length read length.
 * @return {Array.<Number>} plain data.
 */
PSD.StreamReader.prototype.readPackBits = function(length) {
  /** @type {number} */
  var limit;
  /** @type {number} */
  var runLength;
  /** @type {number} */
  var copyValue;
  /** @type {Array.<number>} */
  var data = [];
  /** @type {number} */
  var pos = 0;

  limit = this.ip + length;

  // decode
  while (this.ip < limit) {
    runLength = this.readInt8();

    // runlength copy
    if (runLength < 0) {
      runLength = 1 - runLength;
      copyValue = this.readUint8();
      while (runLength-- > 0) {
        data[pos++] = copyValue;
      }
      // plain copy
    } else {
      runLength = 1 + runLength;
      while (runLength-- > 0) {
        data[pos++] = this.readUint8();
      }
    }
  }

  return data;
};

// end of scope
});