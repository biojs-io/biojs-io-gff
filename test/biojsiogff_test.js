/*
 * biojs-io-gff
 * https://github.com/greenify/biojs-io-gff
 *
 * Copyright (c) 2014 greenify
 * Licensed under the Apache 2 license.
 */

var chai = require('chai');
var assert = chai.assert;
chai.expect();
chai.should();

var biojsiogff = require('../lib/biojsiogff.js');
var fs = require('fs')

suite("GFF parser");

test("test with fs", function(done) {
  var expectedResult = JSON.parse(fs.readFileSync(__dirname + '/dummy.json', 'utf8'));
  fs.readFile(__dirname + '/dummy.gff','utf8', function(err,data){
    if (err) {
      return console.log(err);
    }
    var obj = biojsiogff.parse(data);
    obj = JSON.parse(JSON.stringify(obj));
    obj.should.eql(expectedResult);
    done();
  });
});

test("test with fer1", function(done) {
  var expectedResult = JSON.parse(fs.readFileSync(__dirname + '/fer1.json', 'utf8'));
  fs.readFile(__dirname + '/fer1.gff','utf8', function(err,data){
    if (err) {
      return console.log(err);
    }
    var obj = biojsiogff.parse(data);
    console.log(JSON.stringify(obj));
    obj = JSON.parse(JSON.stringify(obj));
    obj.should.eql(expectedResult);
    done();
  });
});
