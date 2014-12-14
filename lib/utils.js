var utils = {};
module.exports = utils;

utils.extractKeys = function extractKeys(attr){
  // extract key-value definitions
  var attributes = {};
  var attrArr = attr.split(";");
  attrArr.forEach(function(el) {
    var keyArr, key, val;
    if (el.indexOf("=") > 0) {
      keyArr = el.split("=");
      key = keyArr[0];
      val = keyArr[1];
      attributes[key] = val;
    } else if (el.indexOf(" ") > 0) {
      keyArr = el.split(" ");
      key = keyArr[0];
      val = keyArr[1].replace(/"/g, '');
      attributes[key] = val;
    }
  });
  return attributes;
};
