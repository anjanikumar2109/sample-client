import {Injectable} from '@angular/core';
import * as moment from 'moment';

const isPlainObject: any = require('lodash/isPlainObject');
const isString: any = require('lodash/isString');
const isArray: any = require('lodash/isArray');
const forEach: any = require('lodash/forEach');

export const convertToMap: any = function (arr: any, key: any) {
  if (isArray(arr) && isString(key)) {
    const res: any = {};
    for (let i: number = 0; i < arr.length; i++) {
      if (arr[i][key]) {
        res[arr[i][key]] = clone(arr[i]);
      }
    }
    return res;
  }
  return {};
};


export const clone: any = ((() => {
  function _instanceof(obj, type) {
    return type != null && obj instanceof type;
  }

  let nativeMap;
  try {
    nativeMap = Map;
  } catch (_) {
    nativeMap = () => {
    };
  }

  let nativeSet;
  try {
    nativeSet = Set;
  } catch (_) {
    nativeSet = () => {
    };
  }

  let nativePromise;
  try {
    nativePromise = Promise;
  } catch (_) {
    nativePromise = () => {
    };
  }

  class clone {
    constructor(parent, circular, depth, prototype, includeNonEnumerable) {
      if (typeof circular === 'object') {
        depth = circular.depth;
        prototype = circular.prototype;
        includeNonEnumerable = circular.includeNonEnumerable;
        circular = circular.circular;
      }
      const allParents = [];
      const allChildren = [];

      const useBuffer = typeof Buffer != 'undefined';

      if (typeof circular == 'undefined')
        circular = true;

      if (typeof depth == 'undefined')
        depth = Infinity;

      function _clone(parent, depth) {
        // cloning null always returns null
        if (parent === null)
          return null;

        if (depth === 0)
          return parent;

        let child;
        let proto;
        if (typeof parent != 'object') {
          return parent;
        }

        if (_instanceof(parent, nativeMap)) {
          child = new nativeMap();
        } else if (_instanceof(parent, nativeSet)) {
          child = new nativeSet();
        } else if (_instanceof(parent, nativePromise)) {
          child = new nativePromise((resolve, reject) => {
            parent.then(value => {
              resolve(_clone(value, depth - 1));
            }, err => {
              reject(_clone(err, depth - 1));
            });
          });
        } else if (clone['__isArray'](parent)) {
          child = [];
        } else if (clone['__isRegExp'](parent)) {
          child = new RegExp(parent.source, __getRegExpFlags(parent));
          if (parent.lastIndex) child.lastIndex = parent.lastIndex;
        } else if (clone['__isDate'](parent)) {
          child = new Date(parent.getTime());
        } else if (useBuffer && Buffer.isBuffer(parent)) {
          child = new Buffer(parent.length);
          parent.copy(child);
          return child;
        } else if (_instanceof(parent, Error)) {
          child = Object.create(parent);
        } else {
          if (typeof prototype == 'undefined') {
            proto = Object.getPrototypeOf(parent);
            child = Object.create(proto);
          }
          else {
            child = Object.create(prototype);
            proto = prototype;
          }
        }

        if (circular) {
          const index = allParents.indexOf(parent);

          if (index != -1) {
            return allChildren[index];
          }
          allParents.push(parent);
          allChildren.push(child);
        }

        if (_instanceof(parent, nativeMap)) {
          parent.forEach((value, key) => {
            const keyChild = _clone(key, depth - 1);
            const valueChild = _clone(value, depth - 1);
            child.set(keyChild, valueChild);
          });
        }
        if (_instanceof(parent, nativeSet)) {
          parent.forEach(value => {
            const entryChild = _clone(value, depth - 1);
            child.add(entryChild);
          });
        }

        for (const i in parent) {
          let attrs;
          if (proto) {
            attrs = Object.getOwnPropertyDescriptor(proto, i);
          }

          if (attrs && attrs.set == null) {
            continue;
          }
          child[i] = _clone(parent[i], depth - 1);
        }

        if (Object.getOwnPropertySymbols) {
          const symbols = Object.getOwnPropertySymbols(parent);
          for (let i: number = 0; i < symbols.length; i++) {
            // Don't need to worry about cloning a symbol because it is a primitive,
            // like a number or string.
            const symbol = symbols[i];
            const descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
            if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
              continue;
            }
            child[symbol] = _clone(parent[symbol], depth - 1);
            if (!descriptor.enumerable) {
              Object.defineProperty(child, symbol, {
                enumerable: false
              });
            }
          }
        }

        if (includeNonEnumerable) {
          const allPropertyNames = Object.getOwnPropertyNames(parent);
          for (let i: number = 0; i < allPropertyNames.length; i++) {
            const propertyName = allPropertyNames[i];
            const descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
            if (descriptor && descriptor.enumerable) {
              continue;
            }
            child[propertyName] = _clone(parent[propertyName], depth - 1);
            Object.defineProperty(child, propertyName, {
              enumerable: false
            });
          }
        }

        return child;
      }

      return _clone(parent, depth);
    }

    static clonePrototype(parent) {
      if (parent === null)
        return null;

      const c = () => {
      };
      c.prototype = parent;
      return new c();
    }
  }

  function __objToStr(o) {
    return Object.prototype.toString.call(o);
  }

  clone['__objToStr'] = __objToStr;

  function __isDate(o) {
    return typeof o === 'object' && __objToStr(o) === '[object Date]';
  }

  clone['__isDate'] = __isDate;

  function __isArray(o) {
    return typeof o === 'object' && __objToStr(o) === '[object Array]';
  }

  clone['__isArray'] = __isArray;

  function __isRegExp(o) {
    return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
  }

  clone['__isRegExp'] = __isRegExp;

  function __getRegExpFlags(re) {
    let flags = '';
    if (re.global) flags += 'g';
    if (re.ignoreCase) flags += 'i';
    if (re.multiline) flags += 'm';
    return flags;
  }

  clone['__getRegExpFlags'] = __getRegExpFlags;

  return clone;
}))();


@Injectable()
export class UtilService {


  static words(str: string): any {
    const reBasicWord: RegExp = /[0-9.]+|[a-z0-9]+|[a-zA-Z0-9]+/g;
    return str.match(reBasicWord) || [];
  }

  static startCase(str: string): any {
    if (!isString(str)) {
      return str;
    }
    return UtilService.words(str)
      .map((token: any) => token.toLowerCase())
      .map((token: any) => token.charAt(0).toUpperCase() + token.slice(1))
      .join(' ');
  }

  static parseTimePatterns(value: any): any {
    let tokens: any = /(now|eod|sod)(?:((?:-|\+)[0-9]+)([YMdhms]))*/.exec(value) || [], time;
    if (tokens[1] === 'now') {
      time = moment();
    }
    if (tokens[1] === 'sod') {
      time = moment().startOf('day');
    }
    if (tokens[1] === 'eod') {
      time = moment().endOf('day');
    }
    if (tokens[2] && tokens[3]) {
      time.add(+tokens[2], tokens[3]);
    }
    return (time && time.toDate()) || value;
  }

  static expandToSeconds(interval: any): any {
    const tokens: any = interval.match(/(\d+)([smhdM])/);
    let val: any = tokens[1] && +tokens[1] || 0;
    switch (tokens[2]) {
      case 'm':
        val = val * 60;
        break;
      case 'h':
        val = val * 60 * 60;
        break;
      case 'd':
        val = val * 60 * 60 * 24;
        break;
      case 'M':
        val = val * 60 * 60 * 24 * 30;
        break;
      default:
        break;
    }
    return val;
  }

  constructor() {
  }

}

