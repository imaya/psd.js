/**
 * ByteArray Reader.
 * @param {!(Array.<number>|Uint8Array)} input input buffer.
 * @param {number=} opt_start start position.
 * @constructor
 */
StreamReader = function(input, opt_start) {
  /** @type {!(Array.<number>|Uint8Array)} */
  this.input = USE_TYPEDARRAY ? new Uint8Array(input) : input;
  /** @type {number} */
  this.ip = opt_start | 0;
}

/**
 * @return {number}
 */
StreamReader.prototype.readUint32 = function() {
  return (
    (this.input[this.ip++] << 24) | (this.input[this.ip++] << 16) |
    (this.input[this.ip++] <<  8) | (this.input[this.ip++]      )
  ) >>> 0;
};

/**
 * @return {number}
 */
StreamReader.prototype.readInt32 = function() {
  return (
    (this.input[this.ip++] << 24) | (this.input[this.ip++] << 16) |
    (this.input[this.ip++] <<  8) | (this.input[this.ip++]      )
  );
};

/**
 * @return {number}
 */
StreamReader.prototype.readUint16 = function() {
  return (this.input[this.ip++] << 8) | this.input[this.ip++];
};

/**
 * @return {number}
 */
StreamReader.prototype.readInt16 = function() {
  return ((this.input[this.ip++] << 8) | this.input[this.ip++]) << 16 >> 16;
};

/**
 * @return {number}
 */
StreamReader.prototype.readUint8 = function() {
  return this.input[this.ip++];
};

/**
 * @return {number}
 */
StreamReader.prototype.readInt8 = function() {
  return this.input[this.ip++] << 24 >> 24;
};

/**
 * @return {number}
 */
StreamReader.prototype.readFloat64 = (function() {
  if (USE_TYPEDARRAY) {
    /** @type {ArrayBuffer} */
    var buffer = new ArrayBuffer(8);
    /** @type {Uint8Array} */
    var uint8 = new Uint8Array(buffer);
    /** @type {Float64Array} */
    var float64 = new Float64Array(buffer);
  } else {
    /** @const @type {number} */
    var Pow48 = Math.pow(2, 48);
    /** @const @type {number} */
    var Pow40 = Math.pow(2, 40);
    /** @const @type {number} */
    var Pow32 = Math.pow(2, 32);
    /** @const @type {number} */
    var Pow24 = Math.pow(2, 24);
    /** @const @type {number} */
    var Pow16 = Math.pow(2, 16);
    /** @const @type {number} */
    var Pow8  = Math.pow(2,  8);
    /** @const @type {number} */
    var Pow_1022 = Math.pow(2, -1022);
    /** @const @type {number} */
    var Pow_52 = Math.pow(2, -52);
  }

  return function() {
    /** @type {number} */
    var value;

    value = USE_TYPEDARRAY ?
      parseDoubleUsingTypedArray(this.input, this.ip) :
      parseDoublePlain(this.input, this.ip);

    this.ip += 8;

    return value;
  };

  /**
   * @param {!(Array.<number>|Uint8Array)} input
   * @param {number} ip
   * @return {number}
   */
  function parseDoublePlain(input, ip) {
    /** @type {boolean} true: positive, false: negative */
    var sign = (input[ip] & 0x80) === 0;
    /** @type {number} */
    var exp = ((input[ip++] & 0x7F) << 4) | ((input[ip] & 0xf0) >> 4);
    /** @type {number} */
    var mantissa = ((input[ip++] & 0x0f) * Pow48) +
      (input[ip++] * Pow40) + (input[ip++] * Pow32) + (input[ip++] * Pow24) +
      (input[ip++] * Pow16) + (input[ip++] *  Pow8) +  input[ip++];

    if (exp === 0) {
      return mantissa === 0 ? 0 :
        (sign ? 1 : -1) * Pow_1022 * mantissa * Pow_52;
    } else if (exp === 0x7ff) {
      return (
        mantissa ? NaN :
          sign     ? Infinity : -Infinity
        );
    }

    return (sign ? 1 : -1) *
      (Math.pow(2, exp - 1023) + mantissa * Math.pow(2, exp - 1075));
  }

  /**
   * @param {!(Array.<number>|Uint8Array)} input
   * @param {number} ip
   * @return {number}
   */
  function parseDoubleUsingTypedArray(input, ip) {
    /** @type {number} */
    var i = 8;

    while (--i) {
      uint8[i] = input[ip++];
    }

    return float64[0];
  }
})();

/**
 * @param {number} length
 * @return {!(Array.<number>|Uint8Array)}
 */
StreamReader.prototype.read = function(length) {
  return USE_TYPEDARRAY ?
    this.input.subarray(this.ip, this.ip += length) :
    this.input.slice(this.ip, this.ip += length);
};

StreamReader.prototype.readHex = function(length) {
  return (new Buffer(this.read(length))).toString('hex');
}

/**
 * @param {number} start start position.
 * @param {number} end end position.
 * @return {!(Array.<number>|Uint8Array)}
 */
StreamReader.prototype.slice = function(start, end) {
  this.ip = end;
  return USE_TYPEDARRAY ?
    this.input.subarray(start, end) : this.input.slice(start, end);
};

/**
 * @param {number} start start position.
 * @param {number} end end position.
 * @return {!(Array.<number>|Uint8Array)}
 */
StreamReader.prototype.fetch = function(start, end) {
  return USE_TYPEDARRAY ?
    this.input.subarray(start, end) : this.input.slice(start, end);
};

/**
 * @param {number} length read length.
 * @return {string}
 */
StreamReader.prototype.readString = function(length) {
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
 * @param {number} length read length.
 * @return {string}
 */
StreamReader.prototype.readWideString = function(length) {
  /** @type {!(Array.<number>|Uint8Array)} */
  var input = this.input;
  /** @type {number} */
  var ip = this.ip;
  /** @type {Array.<string>} */
  var charArray = [];
  /** @type {number} */
  var i;

  for (i = 0; i < length; ++i) {
    charArray[i] = String.fromCharCode((input[ip++] << 8) | input[ip++]);
  }

  this.ip = ip;

  return charArray.join('');
};

/**
 * @return {string}
 */
StreamReader.prototype.readPascalString = function() {
  return this.readString(this.input[this.ip++]);
};

/**
 * @return {number}
 */
StreamReader.prototype.tell = function() {
  return this.ip;
};

/**
 * @param {number} pos position.
 * @param {number=} opt_base base position.
 */
StreamReader.prototype.seek = function(pos, opt_base) {
  if (typeof opt_base !== 'number') {
    opt_base = this.ip;
  }
  this.ip = opt_base + pos;
};

/**
 * @param {number} length read length.
 * @return {Array.<Number>} plain data.
 */
StreamReader.prototype.readPackBits = function(length) {
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

module.exports = StreamReader;
