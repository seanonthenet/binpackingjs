(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("BinPacking", [], factory);
	else if(typeof exports === 'object')
		exports["BinPacking"] = factory();
	else
		root["BinPacking"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Score {

  constructor(score_1, score_2) {
    this.score_1 = Score.MAX_INT;
    this.score_2 = Score.MAX_INT;

    if (typeof score_1 != 'undefined') this.score_1 = score_1;
    if (typeof score_2 != 'undefined') this.score_2 = score_2;
  }

  /**
   * Lower is better
   */
  valueOf() {
    return this.score_1 + this.score_2;
  }

  assign(other) {
    this.score_1 = other.score_1;
    this.score_2 = other.score_2;
  }

  isBlank() {
    return this.score_1 === Score.MAX_INT;
  }

  decreaseBy(delta) {
    this.score_1 += delta;
    this.score_2 += delta;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Score;

Score.MAX_INT = Number.MAX_SAFE_INTEGER;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Score__ = __webpack_require__(0);


class Base {

  findPositionForNewNode(box, freeRects) {
    let bestScore = new __WEBPACK_IMPORTED_MODULE_0__Score__["a" /* default */]();
    let width = box.width;
    let height = box.height;

    freeRects.forEach(freeRect => {
      this.tryPlaceRectIn(freeRect, box, width, height, bestScore);
      this.tryPlaceRectIn(freeRect, box, height, width, bestScore);
    });

    return bestScore;
  }

  tryPlaceRectIn(freeRect, box, rectWidth, rectHeight, bestScore) {
    if (freeRect.width >= rectWidth && freeRect.height >= rectHeight) {
      let score = this.calculateScore(freeRect, rectWidth, rectHeight);
      if (score < bestScore) {
        box.x = freeRect.x;
        box.y = freeRect.y;
        box.width = rectWidth;
        box.height = rectHeight;
        box.packed = true;
        bestScore.assign(score);
      }
    }
  }

  calculateScore(freeRect, rectWidth, rectHeight) {
    throw "NotImplementedError";
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Base;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Score__ = __webpack_require__(0);



class BestShortSideFit extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */] {

  calculateScore(freeRect, rectWidth, rectHeight) {
    let leftOverHoriz = Math.abs(freeRect.width - rectWidth);
    let leftOverVert = Math.abs(freeRect.height - rectHeight);
    let args = [leftOverHoriz, leftOverVert].sort((a, b) => a - b);
    let score = new __WEBPACK_IMPORTED_MODULE_1__Score__["a" /* default */](args[0], args[1]);
    return score;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = BestShortSideFit;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Box {

  constructor(width, height) {
    this.width = null;
    this.height = null;
    this.x = 0;
    this.y = 0;
    this.packed = false;

    this.width = width;
    this.height = height;
  }

  rotate() {
    let { width, height } = this;
    this.width = height;
    this.height = width;
  }

  get label() {
    return `${this.width}x${this.height} at [${this.x},${this.y}]`;
  }

  get area() {
    return this.width * this.height;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Box;


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Bin__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Box__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Packer__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__heuristics__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Bin", function() { return __WEBPACK_IMPORTED_MODULE_0__Bin__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Box", function() { return __WEBPACK_IMPORTED_MODULE_1__Box__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Packer", function() { return __WEBPACK_IMPORTED_MODULE_2__Packer__["a"]; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "heuristics", function() { return __WEBPACK_IMPORTED_MODULE_3__heuristics__; });







/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__heuristics_BestShortSideFit__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Box__ = __webpack_require__(3);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




class Bin {

  constructor(width, height, heuristic) {
    this.width = null;
    this.height = null;
    this.boxes = [];
    this.heuristic = null;
    this.freeRectangles = [];

    this.width = width;
    this.height = height;
    this.freeRectangles = [new FreeSpaceBox(width, height)];
    this.heuristic = heuristic || new __WEBPACK_IMPORTED_MODULE_0__heuristics_BestShortSideFit__["a" /* default */]();
  }

  get area() {
    return this.width * this.height;
  }

  get efficiency() {
    let boxesArea = 0;
    this.boxes.forEach(box => {
      boxesArea += box.area;
    });
    return boxesArea * 100 / this.area;
  }

  get label() {
    return `${this.width}x${this.height} ${this.efficiency}%`;
  }

  insert(box) {
    if (box.packed) return false;

    this.heuristic.findPositionForNewNode(box, this.freeRectangles);
    if (!box.packed) return false;

    let numRectanglesToProcess = this.freeRectangles.length;
    let i = 0;

    while (i < numRectanglesToProcess) {
      if (this.splitFreeNode(this.freeRectangles[i], box)) {
        this.freeRectangles.splice(i, 1);
        numRectanglesToProcess--;
      } else {
        i++;
      }
    }

    this.pruneFreeList();
    this.boxes.push(box);

    return true;
  }

  scoreFor(box) {
    let copyBox = new __WEBPACK_IMPORTED_MODULE_1__Box__["a" /* default */](box.width, box.height);
    let score = this.heuristic.findPositionForNewNode(copyBox, this.freeRectangles);
    return score;
  }

  isLargerThan(box) {
    return this.width >= box.width && this.height >= box.height || this.height >= box.width && this.width >= box.height;
  }

  splitFreeNode(freeNode, usedNode) {
    // Test with SAT if the rectangles even intersect.
    if (usedNode.x >= freeNode.x + freeNode.width || usedNode.x + usedNode.width <= freeNode.x || usedNode.y >= freeNode.y + freeNode.height || usedNode.y + usedNode.height <= freeNode.y) {
      return false;
    }

    this.trySplitFreeNodeVertically(freeNode, usedNode);
    this.trySplitFreeNodeHorizontally(freeNode, usedNode);

    return true;
  }

  trySplitFreeNodeVertically(freeNode, usedNode) {
    if (usedNode.x < freeNode.x + freeNode.width && usedNode.x + usedNode.width > freeNode.x) {
      this.tryLeaveFreeSpaceAtTop(freeNode, usedNode);
      this.tryLeaveFreeSpaceAtBottom(freeNode, usedNode);
    }
  }

  tryLeaveFreeSpaceAtTop(freeNode, usedNode) {
    if (usedNode.y > freeNode.y && usedNode.y < freeNode.y + freeNode.height) {
      let newNode = _extends({}, freeNode);
      newNode.height = usedNode.y - newNode.y;
      this.freeRectangles.push(newNode);
    }
  }

  tryLeaveFreeSpaceAtBottom(freeNode, usedNode) {
    if (usedNode.y + usedNode.height < freeNode.y + freeNode.height) {
      let newNode = _extends({}, freeNode);
      newNode.y = usedNode.y + usedNode.height;
      newNode.height = freeNode.y + freeNode.height - (usedNode.y + usedNode.height);
      this.freeRectangles.push(newNode);
    }
  }

  trySplitFreeNodeHorizontally(freeNode, usedNode) {
    if (usedNode.y < freeNode.y + freeNode.height && usedNode.y + usedNode.height > freeNode.y) {
      this.tryLeaveFreeSpaceOnLeft(freeNode, usedNode);
      this.tryLeaveFreeSpaceOnRight(freeNode, usedNode);
    }
  }

  tryLeaveFreeSpaceOnLeft(freeNode, usedNode) {
    if (usedNode.x > freeNode.x && usedNode.x < freeNode.x + freeNode.width) {
      let newNode = _extends({}, freeNode);
      newNode.width = usedNode.x - newNode.y;
      this.freeRectangles.push(newNode);
    }
  }

  tryLeaveFreeSpaceOnRight(freeNode, usedNode) {
    if (usedNode.x + usedNode.width < freeNode.x + freeNode.width) {
      let newNode = _extends({}, freeNode);
      newNode.x = usedNode.x + usedNode.width;
      newNode.width = freeNode.x + freeNode.width - (usedNode.x + usedNode.width);
      this.freeRectangles.push(newNode);
    }
  }

  /**
   * Goes through the free rectangle list and removes any redundant entries.
   */
  pruneFreeList() {
    let i = 0;
    while (i < this.freeRectangles.length) {
      let j = i + 1;
      if (j === this.freeRectangles.length) {
        break;
      }
      while (j < this.freeRectangles.length) {
        if (this.isContainedIn(this.freeRectangles[i], this.freeRectangles[j])) {
          this.freeRectangles.splice(i, 1);
          i--;
          break;
        }
        if (this.isContainedIn(this.freeRectangles[j], this.freeRectangles[i])) {
          this.freeRectangles.splice(j, 1);
        } else {
          j++;
        }
        i++;
      }
    }
  }

  isContainedIn(rectA, rectB) {
    return rectA.x >= rectB.x && rectA.y >= rectB.y && rectA.x + rectA.width <= rectB.x + rectB.width && rectA.y + rectA.height <= rectB.y + rectB.height;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bin;


class FreeSpaceBox {

  constructor(width, height) {
    this.x = 0;
    this.y = 0;
    this.width = null;
    this.height = null;

    this.width = width;
    this.height = height;
  }

}
/* unused harmony export FreeSpaceBox */


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Score__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ScoreBoard__ = __webpack_require__(9);



class Packer {

  constructor(bins) {
    this.bins = [];
    this.unpackedBoxes = [];

    this.bins = bins;
  }

  pack(boxes, options = {}) {
    let packedBoxes = [];
    let entry;

    boxes = boxes.filter(box => !box.packed);
    if (boxes.length === 0) return packedBoxes;

    let limit = options.limit || __WEBPACK_IMPORTED_MODULE_0__Score__["a" /* default */].MAX_INT;
    let board = new __WEBPACK_IMPORTED_MODULE_1__ScoreBoard__["a" /* default */](this.bins, boxes);

    while (entry = board.bestFit()) {
      entry.bin.insert(entry.box);
      board.removeBox(entry.box);
      board.recalculateBin(entry.bin);
      packedBoxes.push(entry.box);
      if (packedBoxes.length >= limit) {
        break;
      }
    };
    return packedBoxes;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Packer;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ScoreBoardEntry__ = __webpack_require__(10);
// #       box_1 box_2 box_3 ...
// # bin_1  100   200    0
// # bin_2   0     5     0
// # bin_3   9    100    0
// # ...


class ScoreBoard {

  constructor(bins, boxes) {
    this.entries = [];

    bins.forEach(bin => {
      this.addBinEntries(bin, boxes);
    });
  }

  debug() {
    __webpack_require__(11);
    console.table(this.entries.map(entry => ({ bin: entry.bin.label, box: entry.box.label, score: entry.score })));
  }

  addBinEntries(bin, boxes) {
    boxes.forEach(box => {
      let entry = new __WEBPACK_IMPORTED_MODULE_0__ScoreBoardEntry__["a" /* default */](bin, box);
      entry.calculate();
      this.entries.push(entry);
    });
  }

  any() {
    return this.boxes.some(box => box);
  }

  largestNotFitingBox() {
    let unfit = null;
    let fittingBoxes = this.entries.filter(entry => entry.fit).map(entry => entry.box);

    this.entries.forEach(entry => {
      if (!this.fittingBoxes.contains(entry.box)) {
        return;
      }
      if (unfit === null || unfit.box.area < entry.box.area) {
        this.unfit = entry;
      }
    });

    return unfit.box ? unfit : false;
  }

  bestFit() {
    let best = null;
    for (let i = 0; i < this.entries.length; i++) {
      let entry = this.entries[i];
      if (!entry.fit()) {
        continue;
      }
      if (best === null || entry.score < best.score) {
        best = entry;
      }
    }
    return best;
  }

  removeBox(box) {
    this.entries = this.entries.filter(entry => {
      return entry.box !== box;
    });
  }

  addBin(bin) {
    this.addBinEntries(bin, this.currentBoxes());
  }

  recalculateBin(bin) {
    this.entries.filter(entry => entry.bin === bin).forEach(entry => entry.calculate());
  }

  currentBoxes() {
    return [...new Set(this.entries.map(entry => entry.box))];
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ScoreBoard;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ScoreBoardEntry {

  constructor(bin, box) {
    this.bin = null;
    this.box = null;
    this.score = null;

    this.bin = bin;
    this.box = box;
  }

  calculate() {
    this.score = this.bin.scoreFor(this.box);
    return this.score;
  }

  fit() {
    return !this.score.isBlank();
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ScoreBoardEntry;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

(function () {
  'use strict';

  function setupConsoleTable() {
    if (typeof console === 'undefined') {
      throw new Error('Weird, console object is undefined');
    }
    if (typeof console.table === 'function') {
      return;
    }

    function isType(t, x) {
      return typeof x === t;
    }

    var isString = isType.bind(null, 'string');

    function isArrayOf(isTypeFn, a) {
      return Array.isArray(a) &&
        a.every(isTypeFn);
    }

    var isArrayOfStrings = isArrayOf.bind(null, isString);
    var isArrayOfArrays = isArrayOf.bind(null, Array.isArray);

    var Table = __webpack_require__(12);

    function arrayToString(arr) {
      var t = new Table();
      arr.forEach(function (record) {
        if (typeof record === 'string' ||
          typeof record === 'number') {
          t.cell('item', record);
        } else {
          // assume plain object
          Object.keys(record).forEach(function (property) {
            t.cell(property, record[property]);
          });
        }
        t.newRow();
      });
      return t.toString();
    }

    function printTableWithColumnTitles(titles, items) {
      var t = new Table();
      items.forEach(function (item) {
        item.forEach(function (value, k) {
          t.cell(titles[k], value);
        });
        t.newRow();
      });
      var str = t.toString();
      console.log(str);
    }

    function printTitleTable(title, arr) {
      var str = arrayToString(arr);
      var rowLength = str.indexOf('\n');
      if (rowLength > 0) {
        if (title.length > rowLength) {
          rowLength = title.length;
        }
        console.log(title);
        var sep = '-', k, line = '';
        for (k = 0; k < rowLength; k += 1) {
          line += sep;
        }
        console.log(line);
      }
      console.log(str);
    }

    function objectToArray(obj) {
      var keys = Object.keys(obj);
      return keys.map(function (key) {
        return {
          key: key,
          value: obj[key]
        };
      });
    }

    function objectToString(obj) {
      return arrayToString(objectToArray(obj));
    }

    console.table = function () {
      var args = Array.prototype.slice.call(arguments);

      if (args.length === 2 &&
        typeof args[0] === 'string' &&
        Array.isArray(args[1])) {

        return printTitleTable(args[0], args[1]);
      }

      if (args.length === 2 &&
        isArrayOfStrings(args[0]) &&
        isArrayOfArrays(args[1])) {
        return printTableWithColumnTitles(args[0], args[1]);
      }

      args.forEach(function (k) {
        if (typeof k === 'string') {
          return console.log(k);
        } else if (Array.isArray(k)) {
          console.log(arrayToString(k));
        } else if (typeof k === 'object') {
          console.log(objectToString(k));
        }
      });
    };
  }

  setupConsoleTable();
}());


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = Table

function Table() {
  this.rows = []
  this.row = {__printers : {}}
}

/**
 * Push the current row to the table and start a new one
 *
 * @returns {Table} `this`
 */

Table.prototype.newRow = function() {
  this.rows.push(this.row)
  this.row = {__printers : {}}
  return this
}

/**
 * Write cell in the current row
 *
 * @param {String} col          - Column name
 * @param {Any} val             - Cell value
 * @param {Function} [printer]  - Printer function to format the value
 * @returns {Table} `this`
 */

Table.prototype.cell = function(col, val, printer) {
  this.row[col] = val
  this.row.__printers[col] = printer || string
  return this
}

/**
 * String to separate columns
 */

Table.prototype.separator = '  '

function string(val) {
  return val === undefined ? '' : ''+val
}

function length(str) {
  return str.replace(/\u001b\[\d+m/g, '').length
}

/**
 * Default printer
 */

Table.string = string

/**
 * Create a printer which right aligns the content by padding with `ch` on the left
 *
 * @param {String} ch
 * @returns {Function}
 */

Table.leftPadder = leftPadder

function leftPadder(ch) {
  return function(val, width) {
    var str = string(val)
    var len = length(str)
    var pad = width > len ? Array(width - len + 1).join(ch) : ''
    return pad + str
  }
}

/**
 * Printer which right aligns the content
 */

var padLeft = Table.padLeft = leftPadder(' ')

/**
 * Create a printer which pads with `ch` on the right
 *
 * @param {String} ch
 * @returns {Function}
 */

Table.rightPadder = rightPadder

function rightPadder(ch) {
  return function padRight(val, width) {
    var str = string(val)
    var len = length(str)
    var pad = width > len ? Array(width - len + 1).join(ch) : ''
    return str + pad
  }
}

var padRight = rightPadder(' ')

/**
 * Create a printer for numbers
 *
 * Will do right alignment and optionally fix the number of digits after decimal point
 *
 * @param {Number} [digits] - Number of digits for fixpoint notation
 * @returns {Function}
 */

Table.number = function(digits) {
  return function(val, width) {
    if (val == null) return ''
    if (typeof val != 'number')
      throw new Error(''+val + ' is not a number')
    var str = digits == null ? val+'' : val.toFixed(digits)
    return padLeft(str, width)
  }
}

function each(row, fn) {
  for(var key in row) {
    if (key == '__printers') continue
    fn(key, row[key])
  }
}

/**
 * Get list of columns in printing order
 *
 * @returns {string[]}
 */

Table.prototype.columns = function() {
  var cols = {}
  for(var i = 0; i < 2; i++) { // do 2 times
    this.rows.forEach(function(row) {
      var idx = 0
      each(row, function(key) {
        idx = Math.max(idx, cols[key] || 0)
        cols[key] = idx
        idx++
      })
    })
  }
  return Object.keys(cols).sort(function(a, b) {
    return cols[a] - cols[b]
  })
}

/**
 * Format just rows, i.e. print the table without headers and totals
 *
 * @returns {String} String representaion of the table
 */

Table.prototype.print = function() {
  var cols = this.columns()
  var separator = this.separator
  var widths = {}
  var out = ''

  // Calc widths
  this.rows.forEach(function(row) {
    each(row, function(key, val) {
      var str = row.__printers[key].call(row, val)
      widths[key] = Math.max(length(str), widths[key] || 0)
    })
  })

  // Now print
  this.rows.forEach(function(row) {
    var line = ''
    cols.forEach(function(key) {
      var width = widths[key]
      var str = row.hasOwnProperty(key)
        ? ''+row.__printers[key].call(row, row[key], width)
        : ''
      line += padRight(str, width) + separator
    })
    line = line.slice(0, -separator.length)
    out += line + '\n'
  })

  return out
}

/**
 * Format the table
 *
 * @returns {String}
 */

Table.prototype.toString = function() {
  var cols = this.columns()
  var out = new Table()

  // copy options
  out.separator = this.separator

  // Write header
  cols.forEach(function(col) {
    out.cell(col, col)
  })
  out.newRow()
  out.pushDelimeter(cols)

  // Write body
  out.rows = out.rows.concat(this.rows)

  // Totals
  if (this.totals && this.rows.length) {
    out.pushDelimeter(cols)
    this.forEachTotal(out.cell.bind(out))
    out.newRow()
  }

  return out.print()
}

/**
 * Push delimeter row to the table (with each cell filled with dashs during printing)
 *
 * @param {String[]} [cols]
 * @returns {Table} `this`
 */

Table.prototype.pushDelimeter = function(cols) {
  cols = cols || this.columns()
  cols.forEach(function(col) {
    this.cell(col, undefined, leftPadder('-'))
  }, this)
  return this.newRow()
}

/**
 * Compute all totals and yield the results to `cb`
 *
 * @param {Function} cb - Callback function with signature `(column, value, printer)`
 */

Table.prototype.forEachTotal = function(cb) {
  for(var key in this.totals) {
    var aggr = this.totals[key]
    var acc = aggr.init
    var len = this.rows.length
    this.rows.forEach(function(row, idx) {
      acc = aggr.reduce.call(row, acc, row[key], idx, len)
    })
    cb(key, acc, aggr.printer)
  }
}

/**
 * Format the table so that each row represents column and each column represents row
 *
 * @param {Object} [opts]
 * @param {String} [ops.separator] - Column separation string
 * @param {Function} [opts.namePrinter] - Printer to format column names
 * @returns {String}
 */

Table.prototype.printTransposed = function(opts) {
  opts = opts || {}
  var out = new Table
  out.separator = opts.separator || this.separator
  this.columns().forEach(function(col) {
    out.cell(0, col, opts.namePrinter)
    this.rows.forEach(function(row, idx) {
      out.cell(idx+1, row[col], row.__printers[col])
    })
    out.newRow()
  }, this)
  return out.print()
}

/**
 * Sort the table
 *
 * @param {Function|string[]} [cmp] - Either compare function or a list of columns to sort on
 * @returns {Table} `this`
 */

Table.prototype.sort = function(cmp) {
  if (typeof cmp == 'function') {
    this.rows.sort(cmp)
    return this
  }

  var keys = Array.isArray(cmp) ? cmp : this.columns()

  var comparators = keys.map(function(key) {
    var order = 'asc'
    var m = /(.*)\|\s*(asc|des)\s*$/.exec(key)
    if (m) {
      key = m[1]
      order = m[2]
    }
    return function (a, b) {
      return order == 'asc'
        ? compare(a[key], b[key])
        : compare(b[key], a[key])
    }
  })

  return this.sort(function(a, b) {
    for (var i = 0; i < comparators.length; i++) {
      var order = comparators[i](a, b)
      if (order != 0) return order
    }
    return 0
  })
}

function compare(a, b) {
  if (a === b) return 0
  if (a === undefined) return 1
  if (b === undefined) return -1
  if (a === null) return 1
  if (b === null) return -1
  if (a > b) return 1
  if (a < b) return -1
  return compare(String(a), String(b))
}

/**
 * Add a total for the column
 *
 * @param {String} col - column name
 * @param {Object} [opts]
 * @param {Function} [opts.reduce = sum] - reduce(acc, val, idx, length) function to compute the total value
 * @param {Function} [opts.printer = padLeft] - Printer to format the total cell
 * @param {Any} [opts.init = 0] - Initial value for reduction
 * @returns {Table} `this`
 */

Table.prototype.total = function(col, opts) {
  opts = opts || {}
  this.totals = this.totals || {}
  this.totals[col] = {
    reduce: opts.reduce || Table.aggr.sum,
    printer: opts.printer || padLeft,
    init: opts.init == null ? 0 : opts.init
  }
  return this
}

/**
 * Predefined helpers for totals
 */

Table.aggr = {}

/**
 * Create a printer which formats the value with `printer`,
 * adds the `prefix` to it and right aligns the whole thing
 *
 * @param {String} prefix
 * @param {Function} printer
 * @returns {printer}
 */

Table.aggr.printer = function(prefix, printer) {
  printer = printer || string
  return function(val, width) {
    return padLeft(prefix + printer(val), width)
  }
}

/**
 * Sum reduction
 */

Table.aggr.sum = function(acc, val) {
  return acc + val
}

/**
 * Average reduction
 */

Table.aggr.avg = function(acc, val, idx, len) {
  acc = acc + val
  return idx + 1 == len ? acc/len : acc
}

/**
 * Print the array or object
 *
 * @param {Array|Object} obj - Object to print
 * @param {Function|Object} [format] - Format options
 * @param {Function} [cb] - Table post processing and formating
 * @returns {String}
 */

Table.print = function(obj, format, cb) {
  var opts = format || {}

  format = typeof format == 'function'
    ? format
    : function(obj, cell) {
      for(var key in obj) {
        if (!obj.hasOwnProperty(key)) continue
        var params = opts[key] || {}
        cell(params.name || key, obj[key], params.printer)
      }
    }

  var t = new Table
  var cell = t.cell.bind(t)

  if (Array.isArray(obj)) {
    cb = cb || function(t) { return t.toString() }
    obj.forEach(function(item) {
      format(item, cell)
      t.newRow()
    })
  } else {
    cb = cb || function(t) { return t.printTransposed({separator: ' : '}) }
    format(obj, cell)
    t.newRow()
  }

  return cb(t)
}

/**
 * Same as `Table.print()` but yields the result to `console.log()`
 */

Table.log = function(obj, format, cb) {
  console.log(Table.print(obj, format, cb))
}

/**
 * Same as `.toString()` but yields the result to `console.log()`
 */

Table.prototype.log = function() {
  console.log(this.toString())
}


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BestAreaFit__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "BestAreaFit", function() { return __WEBPACK_IMPORTED_MODULE_0__BestAreaFit__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BestLongSideFit__ = __webpack_require__(15);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "BestLongSideFit", function() { return __WEBPACK_IMPORTED_MODULE_1__BestLongSideFit__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__BestShortSideFit__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "BestShort", function() { return __WEBPACK_IMPORTED_MODULE_2__BestShortSideFit__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__BottomLeft__ = __webpack_require__(16);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "BottomLeft", function() { return __WEBPACK_IMPORTED_MODULE_3__BottomLeft__["a"]; });





/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Score__ = __webpack_require__(0);



class BestAreaFit extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */] {

  calculateScore(freeRect, rectWidth, rectHeight) {
    let areaFit = freeRect.width * freeRect.height - rectWidth * rectHeight;
    let leftOverHoriz = Math.abs(freeRect.width - rectWidth);
    let leftOverVert = Math.abs(freeRect.height - rectHeight);
    let shortSideFit = Math.min(leftOverHoriz, leftOverVert);
    return new __WEBPACK_IMPORTED_MODULE_1__Score__["a" /* default */](areaFit, shortSideFit);
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = BestAreaFit;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Score__ = __webpack_require__(0);



class BestLongSideFit extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */] {

  calculateScore(freeRect, rectWidth, rectHeight) {
    let leftOverHoriz = Math.abs(freeRect.width - rectWidth);
    let leftOverVert = Math.abs(freeRect.height - rectHeight);
    let args = [leftOverHoriz, leftOverVert].sort((a, b) => a - b).reverse();
    return new __WEBPACK_IMPORTED_MODULE_1__Score__["a" /* default */](args[0], args[1]);
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = BestLongSideFit;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Score__ = __webpack_require__(0);



class BottomLeft extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */] {

  calculateScore(freeRect, rectWidth, rectHeight) {
    let topSideY = freeRect.y + rectHeight;
    return new __WEBPACK_IMPORTED_MODULE_1__Score__["a" /* default */](topSideY, freeRect.x);
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = BottomLeft;


/***/ })
/******/ ]);
});