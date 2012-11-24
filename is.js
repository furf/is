/**
 * is.js
 * A type detection library, based on work in Underscore and jQuery
 *
 * Copyright 2011, Dave Furfero
 * MIT License
 */
(function (define) {

  define('is', function (require, is) {

    var ObjProto = Object.prototype,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty,
        valueOf = Date.prototype.valueOf;

    /**
     * Arguments
     */
    is.Arguments = (function () {
      function isArguments (obj) {
        return !!obj && toString.call(obj) === '[object Arguments]';
      };
      return isArguments(arguments) ? isArguments : function (obj) {
        return !!obj && hasOwnProperty.call(obj, 'callee');
      };
    })();

    /**
     * Array
     */
    is.Array = Array.isArray || function (obj) {
      return !!obj && toString.call(obj) === '[object Array]';
    };

    /**
     * Boolean
     */
    is.Boolean = function (obj) {
      return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
    };

    /**
     * Date
     */
    is.Date = function (obj) {
      return !!obj && toString.call(obj) === '[object Date]';
    };

    /**
     * Document
     */
    is.Document = function (obj) {
      return !!obj && obj.nodeType === 9;
    };

    /**
     * Element
     */
    is.Element = function (obj) {
      return !!obj && obj.nodeType === 1;
    };

    /**
     * Empty
     */
    is.Empty = function (obj) {

      var key;
      
      // Strings and arrays are considered empty if they have 0 length
      if (is.String(obj) || is.Array(obj)) {
        return !obj.length;
      }

      // Discard non-objects
      if (!is.PlainObject(obj)) {
        return false;
      }
      
      // An object is considered empty if it has no properties of its own
      for (key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          return false;
        } 
      }
      
      return true;
    };
    
    /**
     * Function
     */
    is.Function = function (obj) {
      return !!obj && toString.call(obj) === '[object Function]';
    };

    /**
     * NaN
     */
    is.NaN = function (obj) {
      return obj !== obj;
    };

    /**
     * Null
     */
    is.Null = function (obj) {
      return obj === null;
    };

    /**
     * Number
     */
    is.Number = function (obj) {
      return obj === 0 || !!obj && toString.call(obj) === '[object Number]' && !is.NaN(obj);
    };

    /**
     * Object
     */
    is.Object = function (obj) {
      return !!obj && obj === Object(obj);
    };

    /**
     * Plain Object
     */
    is.PlainObject = function (obj) {

  		var key;

  		// Must be an Object.
  		// Because of IE, we also have to check the presence of the constructor property.
  		// Make sure that DOM nodes and window objects don't pass through, as well

  		if (!obj || !is.Object(obj) || is.Element(obj) || is.Window(obj)) {
  			return false;
  		}

  		try {
  			// Not own constructor property must be Object
  			if (obj.constructor &&
  				!hasOwnProperty.call(obj, 'constructor') &&
  				!hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')
  			) {
    			// IE8,9 Will throw exceptions on certain host objects #9897
  				return false;
  			}
  		} catch (e) {
  			return false;
  		}

  		// Own properties are enumerated firstly, so to speed up,
  		// if last one is own, then all properties are own.
  		for (key in obj) {}
  		return is.Undefined(key) || hasOwnProperty.call(obj, key);
    };
    
    /**
     * RegEXp
     */
    is.RegExp = function (obj) {
      return !!obj && toString.call(obj) === '[object RegExp]';
    };

    /**
     * String
     */
    is.String = function (obj) {
      return obj === '' || !!obj && toString.call(obj) === '[object String]';
    };

    /**
     * Undefined
     */
    is.Undefined = function (obj) {
      return obj === void 0;
    };
    
    /**
     * Valid Date
     */
    is.ValidDate = function (obj) {
      if (is.Null(obj) || is.Boolean(obj)) { return false; }
      return !is.NaN(valueOf.call(is.Date(obj) ? obj : new Date(obj)));
    };
    
    /**
     * Window
     */
    is.Window = function (obj) {
      return !!obj && obj === obj.window;
    };
    
    // END is
    
  });
}(typeof define === 'function' && define.amd ? define : function (id, factory) {

  if (typeof exports !== 'undefined') {
    factory(require, exports);
  } else {
    factory(function (value) { return window[value]; }, (window[id] = {}));
  }
}));
