var Descriptor = require('../Descriptor');
var util = require('util');

ImageResourceBlock['1050'] = function() {}

var Slice = function() {};
Slice.prototype.parse = function(stream) {
  this.offset = stream.tell();

  this.id = stream.readUint32();
  this.groupId = stream.readUint32();
  this.origin = stream.readUint32();

  if(parseInt(this.origin) == 1) {
    this.associatedLayerId = stream.readUint32();
  }

  this.name = stream.readUnicode();
  this.type = stream.readUint32();
  this.coordinates = {
    left: stream.readUint32(),
    top: stream.readUint32(),
    right: stream.readUint32(),
    bottom: stream.readUint32()
  };
  this.url = stream.readUnicode();
  this.target = stream.readUnicode();
  this.message = stream.readUnicode();
  this.altTag = stream.readUnicode();
  this.cellIsHtml = stream.readUint8();
  this.cellText = stream.readUnicode();
  this.horizontalAlignment = stream.readUint32();
  this.verticalAlignment = stream.readUint32();
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
    this.rectangle = {
      top: stream.readUint32(),
      left: stream.readUint32(),
      bottom: stream.readUint32(),
      right: stream.readUint32()
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
  }

  this.length = stream.tell() - this.offset;
};
