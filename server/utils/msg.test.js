const expect = require('chai').expect;
var msgGen = require('./msgGen.js').msgGenerator;

describe('generateMessage', ()=> {
    it('should generate correct message obj', ()=> {
        expect(msgGen('Max', 'Hello world')).to.have.property('from', 'Max');
        expect(msgGen('Max', 'Hello world')).to.have.property('text', 'Hello world');
        expect(msgGen('Max', 'Hello world')).to.have.property('createdAt');
        expect(msgGen('Max', 'Hello world')).to.have.property('createdAt').to.be.a('number');
    });
});