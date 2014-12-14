/*
 * biojs-io-gff
 * https://github.com/greenify/biojs-io-gff
 *
 * Copyright (c) 2014 greenify
 * Licensed under the Apache 2 license.
 */

var gff = function() {};
module.exports = gff;

var utils = require("./utils");

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

gff.parse = function(file) {
  var lines = file.split("\n");
  var arr = [];
  for (var i = 0; i < lines.length; i++) {
    var line = gff.parseLine(lines[i]);
    if (line !== undefined)
      arr.push(line);
  }
  return arr;
};

/**
 * parses GFF and returns a dictionary of all seqs with their features
 * @method parseSeqs
 * @param {String} file GFF file
 * @return {String} Returns dictionary of sequences with an array of their features
 */
gff.parseSeqs = function(file) {
  var arr = gff.parse(file);
  var seqs = {};
  arr.forEach(function(entry) {
    var key = entry.seqname;
    if (seqs[key] === undefined) seqs[key] = [];
    delete entry.seqname;
    seqs[key].push(entry);
  });
  return seqs;
};

/*
 * parses one GFF line and returns it
 */
gff.parseLine = function(line) {
  var tLine = {};

  // ignore comments for now
  if (line.length === 0 || line[0] === "#")
    return;

  var columns = line.split(/\s+/);
  // ignore empty lines
  if (columns.length === 1)
    return;

  tLine.seqname = columns[0];
  tLine.source = columns[1];
  tLine.feature = columns[2];
  tLine.start = parseInt(columns[3]);
  tLine.end = parseInt(columns[4]);
  tLine.score = columns[5]; // only DNA,RNA
  tLine.strand = columns[6]; // only DNA,RNA
  tLine.frame = columns[7]; // only DNA,RNA
  var attr = columns.slice(8).join(" "); // plain text comments

  // remove undefined (dot)
  Object.keys(tLine).forEach(function(key) {
    if (tLine[key] === ".") {
      tLine[key] = undefined;
    }
  });

  // parse optional parameters
  if (tLine.score) {
    tLine.score = parseFloat(tLine.score);
  }
  if (tLine.frame) {
    tLine.frame = parseInt(tLine.frame);
  }

  tLine.attributes = utils.extractKeys(attr);
  return tLine;
};
