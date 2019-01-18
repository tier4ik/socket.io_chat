const expect = require('chai').expect;
var isRealString = require('./validation.js').isRealString;

describe('isRealString function test', ()=> {
    it('should return false for non-string data', ()=> {
        expect(isRealString(123)).to.be.false;
        expect(isRealString('    ')).to.be.false;
    });
    it('should return true for real-string data', ()=> {
        expect(isRealString('abcdef')).to.be.true;
    });
});