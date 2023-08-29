'use strict';

// import path from 'path'
var fs = require('fs');
var path = require('path');
var json2xls = require('json2xls');
var _require = require('glob');
  _require.glob;
  var globSync = _require.globSync;
  _require.globStream;
  _require.globStreamSync;
  _require.Glob;
var a = globSync(['locales/**/*.{json,ts,map}']);
console.log(a);
var readDir = function readDir(path) {
  var dirs = [];
  var files = fs.readdirSync(path);
  files.forEach(function (item, index) {
    var file_path = path + '/' + item;
    console.log(file_path);
    var stat = fs.lstatSync(file_path);
    if (stat.isDirectory() === true) {
      dirs.push({
        name: item,
        path: file_path,
        data: require(file_path + "/translation.json")
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
var readFiles = function readFiles(path) {
  var _a;
  var arr = [];
  var dirs = readDir(path);
  var languageWords = ((_a = dirs === null || dirs === void 0 ? void 0 : dirs[0]) === null || _a === void 0 ? void 0 : _a.data) || {};
  for (var key in languageWords) {
    arr.push(Object.assign({
      key: key
    }, getKey2Word(dirs, key)));
  }
  return arr;
};
var writeFileRecursive = function writeFileRecursive(path, buffer, callback) {
  var lastPath = path.substring(0, path.lastIndexOf('/'));
  fs.mkdir(lastPath, {
    recursive: true
  }, function (err) {
    if (err) return callback === null || callback === void 0 ? void 0 : callback(err);
    fs.writeFile(path, buffer, 'binary', function (err) {
      if (err) return callback === null || callback === void 0 ? void 0 : callback(err);
      return callback === null || callback === void 0 ? void 0 : callback(null);
    });
  });
};
var main = function main() {
  var commandPath = path.resolve(process.cwd(), './locales');
  var data = readFiles(commandPath);
  var xls = json2xls(data);
  writeFileRecursive('execl/i18n2xls.xlsx', xls);
};
main();
//# sourceMappingURL=i18n2xls.cjs.js.map
