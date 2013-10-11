PSD.js
======

PSD.js is a library for parsing Photoshop PSD files.

Usage
-----

``` javascript
var Parser = require('psd.js').Parser;
var fs = require('fs');

var data = fs.readFileSync('/path/to/file.psd');
var psd = new Parser(data);

psd.parse();

console.log(psd);
```
    
Acknowledgements
----------------

The PSD.js node module was adapted from imaya's google closure-based frontend javascript library.

TODO
----

 * Replace StreamReader implementation with a node Buffer-based implementation.
 * Parse more ImageResource block types
 
License
-------

Licensed under the MIT License.  See LICENSE for details. 
