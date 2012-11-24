var create = Object.create || function (obj) {
  function F () {}
  F.prototype = obj;
  return new F;
},
    
slice = Array.prototype.slice,
    
values = {
  'Arguments (empty)':                    (function () { return arguments; })(),
  'Arguments (non-empty)':                (function () { return arguments; })(1),
  'Array (empty)':                        [],
  'Array (non-empty)':                    [1, 2, 'a', true],
  'Boolean (false)':                      false,
  'Boolean (true)':                       true,
  'Boolean (object, false)':              new Boolean(false),
  'Boolean (object, true)':               new Boolean(true),
  'Date':                                 new Date(),
  'Date (0)':                             new Date(0),
  'Date (invalid)':                       new Date('wtfurf?!'),
  'Document':                             document,
  'Document (iframe, detached)':          document.createElement('iframe').contentDocument,
  'Document (iframe, appended)':          document.body.appendChild(document.createElement('iframe')).contentDocument,
  'Element':                              document.createElement('a'),
  'Error':                                new Error('Oops!'),
  'Error (TypeError)':                    new TypeError('Oops! I did it again.'),
  'Function':                             function () {},
  'Location':                             window.location,
  'Math':                                 Math,
  'NaN':                                  NaN,
  'Null':                                 null,
  'Number (zero)':                        0,
  'Number (non-zero)':                    42,
  'Number (object, zero)':                new Number(0),
  'Number (object, non-zero)':            new Number(42),
  'Number (infinity)':                    Infinity,
  'Number (negative infinity)':           -Infinity,
  'Object (empty)':                       {},
  'Object (non-empty)':                   { foo: 'bar' },
  'Object (instance)':                    new (function () {})(),
  'Object (subclass instance)':           create(new (function () {})()),
  'Object (create instance, empty)':      create({}),
  'Object (create instance, non-empty)':  create({ foo: 'bar' }),
  'RegExp':                               /[a-z]/g,
  'String (empty)':                       '',
  'String (non-empty)':                   ':)',
  'String (object, empty)':               new String(''),    
  'String (object, non-empty)':           new String(':)'),    
  'String (date m/dd/yyyy)':              '3/13/1973',
  'String (date month dd, yyyy)':         'March 13, 1973',
  'String (invalid date)':                'This is not a date.',
  'Undefined':                            void 0,
  'Window':                               window,
  'Window (iframe, detached)':            document.createElement('iframe').contentWindow,
  'Window (iframe, appended)':            document.body.appendChild(document.createElement('iframe')).contentWindow
},

valids = {

  'Arguments': [
    'Arguments (empty)',
    'Arguments (non-empty)'
  ],
  
  'Array': [
    'Array (empty)',
    'Array (non-empty)'
  ],
  
  'Boolean': [
    'Boolean (false)',
    'Boolean (true)',
    'Boolean (object, false)',
    'Boolean (object, true)'
  ],
  
  'Date': [
    'Date',
    'Date (0)',
    'Date (invalid)'
  ],
  
  'Document': [
    'Document',
    'Document (iframe, appended)'
  ],
  
  'Element': [
    'Element'
  ],
  
  'Empty': [
    'Arguments (empty)',
    'Array (empty)',
    'Object (empty)',
    'Object (create instance, empty)',
    'String (empty)',
    'String (object, empty)'
  ],
  
  'Function': [
    'Function'
  ],
  
  'NaN': [
    'NaN'
  ],
  
  'Null': [
    'Null',
    'Document (iframe, detached)',
    'Window (iframe, detached)'
  ],
  
  'Number': [
    'Number (zero)',
    'Number (non-zero)',
    'Number (object, zero)',
    'Number (object, non-zero)',
    'Number (infinity)',
    'Number (negative infinity)'
  ],
  
  'Object': [
    'Arguments (empty)',
    'Arguments (non-empty)',
    'Array (empty)',
    'Array (non-empty)',
    'Boolean (object, false)',
    'Boolean (object, true)',
    'Date',
    'Date (0)',
    'Date (invalid)',
    'Document',
    'Document (iframe, appended)',
    'Element',
    'Error',
    'Error (TypeError)',
    'Function',
    'Location',
    'Math',
    'Number (object, zero)',
    'Number (object, non-zero)',
    'Object (empty)',
    'Object (non-empty)',
    'Object (instance)',
    'Object (subclass instance)',
    'Object (create instance, empty)',
    'Object (create instance, non-empty)',
    'RegExp',
    'String (object, empty)',    
    'String (object, non-empty)',    
    'Window',
    'Window (iframe, appended)'
  ],
  
  'PlainObject': [
    'Arguments (empty)',
    'Arguments (non-empty)',
    'Math',
    'Object (empty)',
    'Object (non-empty)',
    'Object (create instance, empty)'
  ],
  
  'RegExp': [
    'RegExp'
  ],
  
  'String': [
    'String (empty)',
    'String (non-empty)',
    'String (object, empty)',    
    'String (object, non-empty)',    
    'String (date m/dd/yyyy)',
    'String (date month dd, yyyy)',
    'String (invalid date)'
  ],
  
  'Undefined': [
    'Undefined'
  ],
  
  'ValidDate': [
    'Date',
    'Date (0)',
    'Number (zero)',
    'Number (non-zero)',
    'Number (object, zero)',
    'Number (object, non-zero)',
    'String (date m/dd/yyyy)',
    'String (date month dd, yyyy)',
  ],
  
  'Window': [
    'Window',
    'Window (iframe, appended)'
  ]
  

},

filters = {
  pick: true,
  omit: false
};


_.each(valids, function (isValid, method) {
  test(method, function () { 
    _.each(filters, function (match, filter) {
      _.chain(values)[filter](isValid).each(function (value, key) {
        equal(match, is[method](value), key + ' should return ' + match);
      });
    })
  });
});



// 'Arguments (empty)',
// 'Arguments (non-empty)',
// 'Array (empty)',
// 'Array (non-empty)',
// 'Boolean (false)',
// 'Boolean (true)',
// 'Boolean (object, false)',
// 'Boolean (object, true)',
// 'Date',
// 'Date (0)',
// 'Date (invalid)',
// 'Document',
// 'Document (iframe, detached)',
// 'Document (iframe, appended)',
// 'Element',
// 'Error',
// 'Error (TypeError)',
// 'Function',
// 'Math',
// 'NaN',
// 'Null',
// 'Number (zero)',
// 'Number (non-zero)',
// 'Number (object, zero)',
// 'Number (object, non-zero)',
// 'Number (infinity)',
// 'Number (negative infinity)',
// 'Object (empty)',
// 'Object (non-empty)',
// 'Object (instance)',
// 'Object (subclass instance)',
// 'Object (create instance, empty)',
// 'Object (create instance, non-empty)',
// 'RegExp',
// 'String (empty)',
// 'String (non-empty)',
// 'String (object, empty)',    
// 'String (object, non-empty)',    
// 'String (date m/dd/yyyy)',
// 'String (date month dd, yyyy)',
// 'String (invalid date)',
// 'Undefined',
// 'Window',
// 'Window (iframe, detached)',
// 'Window (iframe, appended)'
