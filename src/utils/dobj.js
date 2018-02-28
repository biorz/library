const factory = require('./factory')

let exs = [{
  key: 'set',
  value: function (obj, keys, val, isOverwrite) {
    keys.split && (keys=keys.split('.'));
    let i=0, l=keys.length, t=obj, x;

    for (; i < l - 1; ++i) {
      x = t[keys[i]]
      t = t[keys[i]] = x instanceof Object || !(x === undefined || isOverwrite)
        ? x
        : {}
    }
    return t[keys[i]] = val
  }
}, {
  key: 'get',
  value: function (obj, keys, val) {
    keys.split && (keys=keys.split('.'));
    let i=0, l=keys.length, t=obj;

    for (; i < l - 1; ++i) {
      t = t[keys[i]]
      if(!(t instanceof Object)) {
        return undefined
      }
    }
    return t[keys[i]]
  },
}, {
  key: 'extend',
  value: function (a, b, undefOnly) {
    for ( var prop in b ) {
      if ( Object.prototype.hasOwnProperty.call( b, prop ) ) {

        if ( prop !== "constructor" || a !== global ) {
          if ( b[ prop ] === undefined ) {
            delete a[ prop ];
          } else if ( !( undefOnly && typeof a[ prop ] !== "undefined" ) ) {
            a[ prop ] = b[ prop ];
          }
        }
      }
    }

    return a;
  }
}]

let ex = factory({}, exs, {
  callback (it, i) {}
})

module.exports = function (options) {
  return ex
}

