/*
 * biojs-io-gff
 * https://github.com/greenify/biojs-io-gff
 *
 * Copyright (c) 2014 greenify
 * Licensed under the Apache 2 license.
 */

var chai = require('chai');
var assert = chai.assert;
var equal = assert.deepEqual;

var gff = require('../');
var fs = require('fs');

suite("GFF parser");

test("test with fs", function(done) {
  var expectedResult = JSON.parse(fs.readFileSync(__dirname + '/dummy.json', 'utf8'));
  fs.readFile(__dirname + '/dummy.gff','utf8', function(err,data){
    if (err) return assert.fail(err);
    var obj = gff.parse(data);
    obj = JSON.parse(JSON.stringify(obj));
    equal(obj[0], expectedResult[0]);
    done();
  });
});

test("test with fer1", function(done) {
  var expectedResult = JSON.parse(fs.readFileSync(__dirname + '/fer1.json', 'utf8'));
  fs.readFile(__dirname + '/fer1.gff','utf8', function(err,data){
    if (err) return assert.fail(err);
    var obj = gff.parse(data);
    obj = JSON.parse(JSON.stringify(obj));
    equal(obj[0], expectedResult[0]);
    done();
  });
});

test("test with eden", function(done) {
  var expectedResult = JSON.parse(fs.readFileSync(__dirname + '/eden.json', 'utf8'));
  fs.readFile(__dirname + '/eden.gff3','utf8', function(err,data){
    if (err) return assert.fail(err);
    var obj = gff.parse(data);
    obj = JSON.parse(JSON.stringify(obj));
    equal(obj[0], expectedResult[0]);
    done();
  });
});

test("test with features", function(done) {
  fs.readFile(__dirname + '/eden.gff3','utf8', function(err,data){
    if (err) return console.log(err);
    var obj = gff.parseSeqs(data);
    equal(1, Object.keys(obj).length);
    equal(23, obj.ctg123.length);
    done();
  });
});

