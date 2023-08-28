'use strict';

// import path from 'path'
var fs = require('fs');
var path = require('path');
var json2xls = require('json2xls');
var commandPath = path.resolve(process.cwd(), './example');
var readDir = function readDir() {
  var dirs = [];
  var files = fs.readdirSync(commandPath);
  files.forEach(function (item, index) {
    var path = commandPath + '/' + item;
    var stat = fs.lstatSync(path);
    if (stat.isDirectory() === true) {
      dirs.push({
        name: item,
        path: path,
        data: require(path + "/resources.json")
      });
    }
  });
  return dirs;
};
var getKey2Word = function getKey2Word(dirs, key) {
  var obj = {};
  dirs.forEach(function (item) {
    var data = item.data;
    var name = item.name;
    var value = data[key] || '';
    obj[name] = value;
  });
  return obj;
};
var readFils = function readFils() {
  var _a, _b;
  var arr = [];
  var languageWords = ((_b = (_a = readDir()) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.data) || {};
  for (var key in languageWords) {
    arr.push(Object.assign({
      key: key
    }, getKey2Word(readDir(), key)));
  }
  return arr;
};
var main = function main() {
  var data = readFils();
  var xls = json2xls(data);
  fs.writeFileSync('i18n2xls.xlsx', xls, 'binary');
};
main();
//# sourceMappingURL=i18n2xls.cjs.js.map
