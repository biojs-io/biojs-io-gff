/*
 * biojs-io-gff
 * https://github.com/greenify/biojs-io-gff
 *
 * Copyright (c) 2014 greenify
 * Licensed under the Apache 2 license.
 */

/**
@class biojs-io-gff
 */


var emptyColumns = ["score", "strand", "frame"];

/**
 * Method responsible to parse GFF
 * @see https://www.sanger.ac.uk/resources/software/gff/spec.html#t_2
 *
 * @example
 *
 *     biojsiogff.parse('SEQ1  EMBL  atg  103  105  .  +  0');
 *
 * @method parse 
 * @param {String} file GFF file
 * @return {String} Returns JSON representation
 */

module.exports.parse = function (file) {
  var lines = file.split("\n");
  var gff = [];
  for(var i = 0; i < lines.length; i++){
    var tLine = {};

    // ignore comments
    if( lines[i].length == 0 || lines[i][0] === "#") continue
    var columns = lines[i].split(/\s+/);
    // ignore empty lines
    if( columns.length === 1 ) continue

    tLine.seqname = columns[0];
    tLine.source = columns[1];
    tLine.feature = columns[2];
    tLine.start = columns[3];
    tLine.end = columns[4];
    tLine.score = columns[5]; // only DNA,RNA
    tLine.strand = columns[6]; // only DNA,RNA
    tLine.frame = columns[7]; // only DNA,RNA
    tLine.attributes = columns.slice(8).join(" "); // plain text comments

    // cleanup of empty columns (marked with a dot)
    for(var j=0; j < emptyColumns.length; j++){
      if( tLine[emptyColumns[j]] === "." ){
        tLine[emptyColumns[j]] = undefined;
      }
    }

    gff.push(tLine);
  }

  return gff;
};
