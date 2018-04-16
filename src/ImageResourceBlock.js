var StreamReader = require('./StreamReader');

var bool = require('./Descriptor/bool');
var doub = require('./Descriptor/doub');
var enumm = require('./Descriptor/enum');
var long = require('./Descriptor/long');
var Objc = require('./Descriptor/Objc');
var TEXT = require('./Descriptor/TEXT');
var VlLs = require('./Descriptor/VlLs');
var Descriptor = require('./Descriptor');
var util = require('util');

/**
 * @constructor
 */
global.ImageResourceBlock = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.identifier;
  /** @type {string} */
  this.name;
  /** @type {number} */
  this.dataSize;
  /** @type {!(Array.<number>|Uint8Array)} */
  this.data;
};

/**
 * @param {StreamReader} stream
 */
ImageResourceBlock.prototype.parse = function(stream) {

  this.offset = stream.tell();

  var signature = stream.readString(4);
  if (signature !== '8BIM') {
    throw new Error('invalid signature at ' + this.offset);
  }

  this.identifier = stream.readUint16();
  this.name = stream.readPascalString();
  if(!this.name.length) { stream.readUint8(); }
  this.dataSize = stream.readUint32();
  if(ImageResourceBlock[this.identifier + ""]) {
    var dataOffset = stream.tell();
    var block = new ImageResourceBlock[this.identifier + ""];
    block.parse(stream);
    this.data = block;
    stream.seek(dataOffset + this.dataSize, 0);
  } else {
    this.data = stream.read(this.dataSize);
  }

  if(stream.readUint8() != 0) {
    stream.seek(stream.tell() - 1, 0);
  }

  this.length = stream.tell() - this.offset;
};

ImageResourceBlock.prototype.toObject = function() {
  return this.data.toObject ? this.data.toObject() : this.data;
}

/* 1050 */
ImageResourceBlock['1050'] = function() {}

var Slice = function() {};
Slice.prototype.parse = function(stream) {
  this.offset = stream.tell();

  this.sliceID = stream.readUint32();
  this.groupId = stream.readUint32();
  this.origin = stream.readUint32();

  if(parseInt(this.origin) == 1) {
    this.associatedLayerId = stream.readUint32();
  }

  this.Nm = stream.readUnicode();
  this.Type = stream.readUint32();
  this.bounds = {
    Left: stream.readUint32(),
    Top: stream.readUint32(),
    Rght: stream.readUint32(),
    Btom: stream.readUint32()
  };
  this.url = stream.readUnicode();
  this.target = stream.readUnicode();
  this.Msge = stream.readUnicode();
  this.altTag = stream.readUnicode();
  this.cellIsHtml = stream.readUint8();
  this.cellText = stream.readUnicode();
  this.horzAlign = stream.readUint32();
  this.vertAlign = stream.readUint32();
  this.color = {
    alpha: stream.readUint8(),
    red: stream.readUint8(),
    green: stream.readUint8(),
    blue: stream.readUint8()
  };

  this.length = stream.tell() - this.offset;
};

ImageResourceBlock['1050'].prototype.type = "sliceInfo";

ImageResourceBlock['1050'].prototype.parse = function(stream) {
  this.offset = stream.tell();

  this.version = stream.readUint32();

  if(this.version == 6) {
    this.bounds = {
      Top: stream.readUint32(),
      Left: stream.readUint32(),
      Bottom: stream.readUint32(),
      Right: stream.readUint32()
    };

    this.name = stream.readUnicode();
    this.count = stream.readUint32();

    this.slices = [];

    for(var i = 0; i < this.count - 1; i++) {
      var slice = new Slice();
      slice.parse(stream);
      this.slices.push(slice);
    }
  } else {
    var length = stream.readUint32();

    this.descriptor = new Descriptor();
    this.descriptor.parse(stream);
    var sliceDataArray = this.descriptor.item[2].data.item;
    this.slices = sliceDataArray.map(function(sliceData) {
      var attrs = sliceData.data.value.item;
      for (var i=0; i<attrs.length; i++) {
        if (attrs[i].key === "bounds") {
          var bounds = attrs[i].data.value.item;
          break;
        }
      }

      return {
        origin: attrs[2].data.enum,
        bounds: {
          Top: bounds[0].data.value,
          Left: bounds[1].data.value,
          Btom: bounds[2].data.value,
          Rght: bounds[3].data.value,
        }
      };
    });
  }

  this.length = stream.tell() - this.offset;
};

ImageResourceBlock['1050'].prototype.toObject = function() {
  if(this.slices) {
    return {slices: this.slices};
  } else {
    return this.descriptor.toObject ? this.descriptor.toObject() : this.descriptor;
  }
};
module.exports = ImageResourceBlock;

