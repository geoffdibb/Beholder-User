var auditRequestLog = require('../routes/auditRequestLog');
var expect = require('chai').expect;

var assert = require('assert');

describe('Array', function () {
    describe('indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(2), 1);
        });
    });
});

it('should return -1 when the value is not present', function () {
    assert.equal([1, 2, 3].indexOf(1), 0);
});

it('function should ... ', function(){
    assert.equal();
})