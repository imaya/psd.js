var Header = require('./Header');
var ColorMode = require('./ColorMode');

/**
 * @param {Header} header
 * @param {ColorModeData} colorModeData
 * @param {Array} channels
 * @constructor
 */
var Color = function(header, colorModeData, channels) {
  /** @type {Header} */
  this.header = header;
  /** @type {ColorModeData} */
  this.colorModeData = colorModeData;
  /** @type {Array} */
  this.channel = channels;
  /** @type {boolean} */
  this.parsed = false;
  /** @type {!(Array.<number>|Uint8Array)} */
  this.redChannel;
  /** @type {!(Array.<number>|Uint8Array)} */
  this.greenChannel;
  /** @type {!(Array.<number>|Uint8Array)} */
  this.blueChannel;
  /** @type {!(Array.<number>|Uint8Array)} */
  this.alphaChannel;
};

Color.prototype.parse = function() {
  switch (this.header.colorMode) {
    case ColorMode.BITMAP:
      console.log('bitmap color mode not supported');
      break;
    case ColorMode.DUOTONE:
      console.log('duotone color mode implementation is incomplete');
      /* FALLTHROUGH */
    case ColorMode.GRAYSCALE:
      this.fromGrayscale();
      break;
    case ColorMode.INDEXED_COLOR:
      this.fromIndexedColor();
      break;
    case ColorMode.MULTICHANNEL_COLOR:
      console.log('multichannel color mode implementation is incomplete');
      /* FALLTHROUGH */
    case ColorMode.RGB_COLOR:
      this.fromRGB();
      break;
    case ColorMode.CMYK_COLOR:
      this.fromCMYK();
      break;
    case ColorMode.LAB_COLOR:
      this.fromLAB();
      break;
  }

  this.parsed = true;
};

Color.prototype.fromRGB = function() {
  /** @type {!(Array.<number>|Uint8Array)} */
  var r = this.redChannel   = this.channel[0];
  /** @type {!(Array.<number>|Uint8Array)} */
  var g = this.greenChannel = this.channel[1];
  /** @type {!(Array.<number>|Uint8Array)} */
  var b = this.blueChannel  = this.channel[2];
  /** @type {!(Array.<number>|Uint8Array)} */
  var a;
  /** @type {number} */
  var skip = this.header.depth / 8;
  /** @type {number} */
  var i;
  /** @type {number} */
  var il;
  /** @type {number} */
  var idx;

  if (skip === 1) {
    return;
  }

  if (this.channel.length === 4) {
    a = this.alphaChannel = this.channel[3];
    for (i = idx = 0, il = r.length; i < il; ++idx, i += skip) {
      r[idx] = r[i];
      g[idx] = g[i];
      b[idx] = b[i];
      a[idx] = a[i];
    }
  } else {
    for (i = idx = 0, il = r.length; i < il; ++idx, i += skip) {
      r[idx] = r[i];
      g[idx] = g[i];
      b[idx] = b[i];
    }
  }

  if (USE_TYPEDARRAY) {
    this.redChannel   = r.subarray(0, idx);
    this.greenChannel = g.subarray(0, idx);
    this.blueChannel  = b.subarray(0, idx);
  } else {
    r.length = g.length = b.length = idx;
  }

  if (this.channel.length === 4) {
    if (USE_TYPEDARRAY) {
      this.alphaChannel = a.subarray(0, idx);
    } else {
      a.length = idx;
    }
  }
};

Color.prototype.fromIndexedColor = function() {
  /** @type {!(Array.<number>|Uint8Array)} */
  var indexed = this.channel[0];
  /** @type {number} */
  var i;
  /** @type {number} */
  var il = indexed.length;
  /** @type {number} */
  var idx;
  /** @type {!(Array.<number>|Uint8Array)} */
  var r = this.redChannel   = new (USE_TYPEDARRAY ? Uint8Array : Array)(il);
  /** @type {!(Array.<number>|Uint8Array)} */
  var g = this.greenChannel = new (USE_TYPEDARRAY ? Uint8Array : Array)(il);
  /** @type {!(Array.<number>|Uint8Array)} */
  var b = this.blueChannel  = new (USE_TYPEDARRAY ? Uint8Array : Array)(il);
  /** @type {!(Array.<number>|Uint8Array)} */
  var palette = this.colorModeData.data;
  /** @type {number} */
  var div = palette.length / 3;

  for (i = idx = 0; i < il; ++idx, i += 1) {
    r[idx] = palette[indexed[i]          ];
    g[idx] = palette[indexed[i] + div    ];
    b[idx] = palette[indexed[i] + div * 2];
  }
};

Color.prototype.fromGrayscale = function() {
  /** @type {!(Array.<number>|Uint8Array)} */
  var gray = this.channel[0];
  /** @type {number} */
  var i;
  /** @type {number} */
  var il = gray.length;
  /** @type {!(Array.<number>|Uint8Array)} */
  var r = this.redChannel   = new (USE_TYPEDARRAY ? Uint8Array : Array)(il);
  /** @type {!(Array.<number>|Uint8Array)} */
  var g = this.greenChannel = new (USE_TYPEDARRAY ? Uint8Array : Array)(il);
  /** @type {!(Array.<number>|Uint8Array)} */
  var b = this.blueChannel  = new (USE_TYPEDARRAY ? Uint8Array : Array)(il);
  /** @type {number} */
  var skip = this.header.depth / 8;
  /** @type {number} */
  var idx;

  for (i = idx = 0; i < il; ++idx, i += skip) {
    r[idx] = g[idx] = b[idx] = gray[i];
  }
};

Color.prototype.fromCMYK = function() {
  /** @type {!(Array.<number>|Uint8Array)} */
  var cc = this.channel[0];
  /** @type {!(Array.<number>|Uint8Array)} */
  var mc = this.channel[1];
  /** @type {!(Array.<number>|Uint8Array)} */
  var yc = this.channel[2];
  /** @type {!(Array.<number>|Uint8Array)} */
  var kc = this.channel[3];
  /** @type {number} */
  var i;
  /** @type {number} */
  var il = cc.length;
  /** @type {!(Array.<number>|Uint8Array)} */
  var r = this.redChannel   = new (USE_TYPEDARRAY ? Uint8Array : Array)(il);
  /** @type {!(Array.<number>|Uint8Array)} */
  var g = this.greenChannel = new (USE_TYPEDARRAY ? Uint8Array : Array)(il);
  /** @type {!(Array.<number>|Uint8Array)} */
  var b = this.blueChannel  = new (USE_TYPEDARRAY ? Uint8Array : Array)(il);
  /** @type {number} */
  var c;
  /** @type {number} */
  var m;
  /** @type {number} */
  var y;
  /** @type {number} */
  var k;
  /** @type {number} */
  var skip = this.header.depth / 8;
  /** @type {number} */
  var idx;

  // TODO: Alpha Channel support

  for (i = idx = 0; i < il; ++idx, i += skip) {
    c = 255 - cc[i];
    m = 255 - mc[i];
    y = 255 - yc[i];
    k = 255 - kc[i];
    r[idx] = (65535 - (c * (255 - k) + (k << 8))) >> 8;
    g[idx] = (65535 - (m * (255 - k) + (k << 8))) >> 8;
    b[idx] = (65535 - (y * (255 - k) + (k << 8))) >> 8;
  }
};

Color.prototype.fromLAB = function() {
  /** @type {!(Array.<number>|Uint8Array)} */
  var lc = this.channel[0];
  /** @type {!(Array.<number>|Uint8Array)} */
  var ac = this.channel[1];
  /** @type {!(Array.<number>|Uint8Array)} */
  var bc = this.channel[2];
  /** @type {number} */
  var i;
  /** @type {number} */
  var il = lc.length;
  /** @type {!(Array.<number>|Uint8Array)} */
  var r = this.redChannel   = new (USE_TYPEDARRAY ? Uint8Array : Array)(il);
  /** @type {!(Array.<number>|Uint8Array)} */
  var g = this.greenChannel = new (USE_TYPEDARRAY ? Uint8Array : Array)(il);
  /** @type {!(Array.<number>|Uint8Array)} */
  var b = this.blueChannel  = new (USE_TYPEDARRAY ? Uint8Array : Array)(il);
  var x;
  /** @type {number} */
  var y;
  /** @type {number} */
  var z;
  /** @const @type {number} */
  var Xn = 0.950456;
  /** @type {number} */
  var Yn = 1.0;
  /** @const @type {number} */
  var Zn = 1.088754;
  /** @const @type {number} */
  var delta = 6 / 29;
  /** @type {number} */
  var fy;
  /** @type {number} */
  var fx;
  /** @type {number} */
  var fz;
  /** @type {number} */
  var idx;
  /** @type {number} */
  var skip = this.header.depth / 8;

  // TODO: Alpha Channel support

  for (i = idx = 0; i < il; ++idx, i += skip) {
    // lab to xyz
    //   L: L' * 100 >> 8
    //   a: a' - 128
    //   b: b' - 128
    fy = ((lc[i] * 100 >> 8) + 16) / 116;
    fx = fy + (ac[i] - 128) / 500;
    fz = fy - (bc[i] - 128) / 200;

    x = fx > delta ? Xn * Math.pow(fx, 3) : (fx - 16 / 116) * 3 * Math.pow(delta, 2);
    y = fy > delta ? Yn * Math.pow(fy, 3) : (fy - 16 / 116) * 3 * Math.pow(delta, 2);
    z = fz > delta ? Zn * Math.pow(fz, 3) : (fz - 16 / 116) * 3 * Math.pow(delta, 2);

    // xyz to adobe rgb
    r[idx] = Math.pow( 2.041588 * x - 0.565007 * y - 0.344731 * z, 1/2.2) * 255;
    g[idx] = Math.pow(-0.969244 * x + 1.875968 * y + 0.041555 * z, 1/2.2) * 255;
    b[idx] = Math.pow( 0.013444 * x - 0.118362 * y + 1.015175 * z, 1/2.2) * 255;
  }
};

/**
 * @return {Array.<!(Array.<number>|Uint8Array)>} RGB Channels.
 */
Color.prototype.toRGB = function() {
  if (!this.parsed) {
    this.parse();
  }

  return [
    this.redChannel,
    this.greenChannel,
    this.blueChannel
  ];
};

/**
 * @return {Array.<!(Array.<number>|Uint8Array)>} RGBA Channels.
 */
Color.prototype.toRGBA = function() {
  if (!this.parsed) {
    this.parse();
  }

  return [
    this.redChannel,
    this.greenChannel,
    this.blueChannel,
    this.alphaChannel
  ];
};

module.exports = Color;
