'use strict';

var fs = require('fs'),
	mime = require('mime-types'),
	jpeg = require('jpeg-js'),
	ndarray = require('ndarray');

var Grade = function(opts) {
	this.opts = {
        img : "",
        perChunk : 4,
    }

    this.params = {
    	type: "",
    	imageDimensions: {
            width: 0,
            height: 0
        },
        imgData: [],
        gradientProperty: [],
    }

    for (var i in opts) {
        this.opts[i] = opts[i];
    }

    this._init();
}

Grade.prototype = {
	_init: function() {
		var self = this,
			opts = self.opts,
			params = self.params;
		params.type = mime.lookup(opts.img);
		self.doParse(params.type);
        self.getTwoColors();
	},

	getColor: function() {
		return this.params.gradientProperty;
	},

	getTwoColors: function() {
		var self = this,
			opts = self.opts,
			params = self.params;
		var chunked = self.getChunkedImageData();
		params.gradientProperty = self.getTopValues(self.getUniqValues(chunked));
	},

	getChunkedImageData: function() {
		var self = this,
			opts = self.opts,
			params = self.params;
		var chunked = params.imgData.reduce((ar, it, i) => {
            const ix = Math.floor(i / opts.perChunk)
            if (!ar[ix]) {
                ar[ix] = []
            }
            ar[ix].push(it);
            return ar
        }, []);
        var filtered = chunked.filter(rgba => {
            return rgba.slice(0, 2).every(val => val < 250) && rgba.slice(0, 2).every(val => val > 0)
        });
        return filtered
	},
	getUniqValues: function(chunked) {
		return chunked.reduce((accum, current) => {
            let key = current.join('|');
            if (!accum[key]) {
                accum[key] = 1;
                return accum
            }
            accum[key] = ++(accum[key]);
            return accum
        }, {})
	},
	getTopValues: function(uniq) {
        var sorted = this.getSortedValues(uniq);
        return [sorted[0], sorted[sorted.length - 1]]
    },
    getSortedValues: function(uniq) {
        var occurs = Object.keys(uniq).map(key => {
                var rgbaKey = key;
                var components = key.split('|'),
                    brightness = ((components[0] * 299) + (components[1] * 587) + (components[2] * 114)) / 1000
                return {
                    rgba: rgbaKey.split('|'),
                    occurs: uniq[key],
                    brightness
                }
            }).sort((a, b) => a.occurs - b.occurs).reverse().slice(0, 10);
        return occurs.sort((a, b) => a.brightness - b.brightness).reverse()
    },
	doParse: function(type) {
		var self = this;
		switch(type) {
		    case 'image/png':
		      self.parsePNG();
		    break;

		    case 'image/jpg':
		    case 'image/jpeg':
		      self.parseJPEG();
		    break;

		    default:
		      new Error("Unsupported file type: " + mimeType);
	  }
	},
	parseJPEG: function() {
		var self = this,
			opts = self.opts,
			params = self.params;

		var jpegData = fs.readFileSync(opts.img);
		var rawImageData = jpeg.decode(jpegData, true);

		params.imageDimensions.width = rawImageData.width;
		params.imageDimensions.height = rawImageData.height;
		params.imgData = Array.from(rawImageData.data);

	}
}
module.exports = Grade;
