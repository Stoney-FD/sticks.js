/**
 *
 * Sticks.js
 * Client-side templating engine
 * (or JSON to XML converter - depends on how you look at it)
 *
 *
 *
 * Copyright (c) 2012 Johannes Stein
 *
 *	Permission is hereby granted, free of charge, to any person obtaining a copy
 *	of this software and associated documentation files (the "Software"), to deal
 *	in the Software without restriction, including without limitation the rights
 *	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *	copies of the Software, and to permit persons to whom the Software is
 *	furnished to do so, subject to the following conditions:
 *
 *	The above copyright notice and this permission notice shall be included in
 *	all copies or substantial portions of the Software.
 *
 *	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *	THE SOFTWARE.
 *
 */
sticks = {
	// Options as JSON object
	"options": {
		// Block names can be defined
		"blockName": {
			"content": "content", // Content name
			"attr": "attr" // Attribute/Tag name
		},

		// Parsing for variables
		// Uses Moustache-like templating by default
		"parse": {
			"start": "{{",
			"end": "}}"
		},
	},

	// Functions

	/**
	 * Converts a JSON object into a XML object
	 *
	 * @param {Object} view JSON object
	 * @param {Object} data Hashtable with objects to be formatted into the resulting
	 * string (optional)
	 *
	 * @return {String}
	 */
	convert: function(view, data) {
		// Data only takes objects
		if( typeof view !== 'object')
			return;

		/**
		 * Converts a JSON key into a XML key
		 *
		 * @param {String} Key name
		 * @param {String} Value name
		 * @param {Object} Attributes as a JSON object (optional)
		 */
		var keyToXML = function(key, value, attr) {
			if(key === sticks.options.blockName.attr)
				return '';
			if(key === sticks.options.blockName.content)
				return value;

			var attrString = '',
				convertedKey = '',
				formattedConvertedKey = '';

			// Append attributes if any
			if(attr) {
				$.each(attr, function(attrKey, attrValue) {
					attrString += [' ', attrKey, '="', attrValue, '"'].join('');
				});
			}
			
			// Convert key
			convertedKey = (value) ? ['<', key, attrString, '>', value, '</', key, '>'].join('') : ['<', key, ' />'].join('');
			formattedConvertedKey = convertedKey;
			
			// Format if data has been specified
			// Format as long as every data
			if(data) {
				$.each(data, function(dataKey, dataValue) {
					var regexp = new RegExp(['\\', sticks.options.parse.start, dataKey, '\\', sticks.options.parse.end].join(''), 'gi');
					formattedConvertedKey = formattedConvertedKey.replace(regexp, dataValue);
				});

			}

			return formattedConvertedKey;
		};

		result = "";

		$.each(view, function(key, value) {
			if( typeof value === 'object') {
				result += (value[sticks.options.blockName.attr]) ? keyToXML(key, sticks.convert(value), value[sticks.options.blockName.attr]) : keyToXML(key, sticks.convert(value));
			} else {
				result += (value[sticks.options.blockName.attr]) ? keyToXML(key, value, value[sticks.options.blockName.attr]) : keyToXML(key, value);
			}
		});

		return result;
	},

	/**
	 *
	 * @see convert
	 *
	 * @param {Object}
	 *
	 * @return {String}
	 */
	template: function(view, data, sel) {
		if(view) {

		}

		if(sel)
			$(sel).html(sticks.convert(view, data));
		else
			return sticks.convert(view, data);
	}

};
