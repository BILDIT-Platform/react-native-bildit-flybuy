"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.platformVersion = void 0;
exports.uniq = uniq;
var _reactNative = require("react-native");
const platformVersion = typeof _reactNative.Platform.Version === 'string' ? parseInt(_reactNative.Platform.Version, 10) : _reactNative.Platform.Version;
exports.platformVersion = platformVersion;
function uniq(array) {
  return array.filter((item, index) => item != null && array.indexOf(item) === index);
}
//# sourceMappingURL=utils.js.map