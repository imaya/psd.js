var fs = require('fs')
var Parser = require('../..').Parser;
var Canvas = require('canvas');
var PixelArray = Canvas.PixelArray;
var ImageData = Canvas.ImageData;

if(!process.argv[2]) {
  console.log("Usage: node slicer.js FILE_NAME.psd");
  process.exit(1);
}

var data = fs.readFileSync(process.argv[2]);

var psd = new Parser(data);
psd.parse();

var height = psd.header.rows;
var width = psd.header.columns;

var pixels = new PixelArray(width, height);
var channels = psd.imageData.image.channel;

var color = psd.imageData.createColor(psd.header, psd.colorModeData);

var x, y, index;
for(y = 0; y < height; ++y) {
  for(x = 0; x < width; ++x) {
    index = (y * width + x);
    pixels[index * 4    ] = color[0][index];
    pixels[index * 4 + 1] = color[1][index];
    pixels[index * 4 + 2] = color[2][index];
    pixels[index * 4 + 3] = 255;
  }
}

var canvas = new Canvas(width, height);
var ctx = canvas.getContext('2d');

var imageData = new ImageData(pixels);
ctx.putImageData(imageData, 0, 0);

canvas.pngStream().pipe(fs.createWriteStream(__dirname + '/../out/whole.png'));

var resources = {};
var imageResources = psd.imageResources.imageResources;
for(var i = 0; i < imageResources.length; i++) {
  resources[imageResources[i].identifier] = imageResources[i];
}

console.log(resources['1050'].toObject());
var slices = resources['1050'].toObject().slices;

for(var i = 0; i < slices.length; i++) {
  (function(slice) {
    var slice = slices[i];

    slice.id = slice.sliceID;
    slice.width = slice.bounds.Rght - slice.bounds.Left;
    slice.height = slice.bounds.Btom - slice.bounds.Top;

    if(slice.id == 0) { return; } // slice 0 is auto-generated, and is whole canvas

    var sliceCanvas = new Canvas(slice.width, slice.height);
    var sliceCtx = sliceCanvas.getContext('2d');
    sliceCtx.putImageData(ctx.getImageData(slice.bounds.Left,
                                           slice.bounds.Top,
                                           slice.width,
                                           slice.height), 0, 0);

    console.log("slicing " + slice.id + " into " + [slice.bounds.Left,
                                                    slice.bounds.Top,
                                                    slice.width,
                                                    slice.height].join(', '));

    var out = fs.createWriteStream(__dirname + '/../out/' + slice.id + '.png');
    sliceCanvas.pngStream().pipe(out);
  })(slices[i]);
}

//console.log(JSON.stringify(slices, null, 2));
