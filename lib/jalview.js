var jalview = {};
module.exports = jalview;
var utils = require("./utils");

// http://www.jalview.org/help/html/features/featuresFormat.html
jalview.readHeader = function(lines) {
  var colors = {};
  var i = 0;
  var features = [];
  var currentGroup;

  for (; i < lines.length; i++) {
    var line = lines[i];
    if (line.indexOf("#") >= 0) {
      // no comments allowed -> stop
      break;
    }
    var columns = line.split(/\t/);
    var firstCell = columns[0].trim();
    if (firstCell === "GFF") {
      // this symbolizes the end 
      break;
    }else if (columns.length === 2) {
      if (firstCell === "startgroup") {
        currentGroup = columns[1].trim();
      } else if (firstCell === "endgroup") {
        currentGroup = "";
        continue;
      } else {
        // parse color
        colors[columns[0]] = jalview.parseColor(columns[1]);
      }
    } else {
      var arr = jalview.parseLine(columns);
      if (currentGroup) {
        arr.attributes.Parent = currentGroup;
      }
      features.push(arr);
    }
  }

  return {
    offset: i,
    colors: colors,
    features: features
  };
};

jalview.parseColor = function(cell) {
  if (cell.indexOf(",") >= 0) {
    // rgb code
    return utils.rgbToHex(cell.split(",").map(function(el) {
      return parseInt(el);
    }));
  }
  if (cell.length === 6) {
    // hex code
    return "#" + cell;
  }
  // color name
  return cell;
};


jalview.parseLine = function(columns) {
  var obj = {
    attributes: {}
  };
  obj.attributes.Name = columns[0]; //desc
  obj.seqname = columns[1]; // id
  obj.start = parseInt(columns[3]);
  obj.end = parseInt(columns[4]);
  obj.feature = columns[2];
  if (obj.seqname === "ID_NOT_SPECIFIED") {
    obj.seqname = columns[2]; // alternative id
  }
  return obj;
};
