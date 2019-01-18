const expect = require('chai').expect;

var Users = require('./users.js').Users;

describe('class Users test', ()=> {
    var users = new Users();
    
    var max = {
        id: 25,
        name: 'Max',
        room: 'room1'
    };

    var newUser = users.addUser(max.id, max.name, max.room);
    
    it('should create a new instans with properties', ()=> {
        expect(newUser).to.have.property('id', 25);
        expect(newUser).to.have.property('name', 'Max');
        expect(newUser).to.have.property('room', 'room1');
    });

    it('getUser should add user to the users array', ()=> {
        expect(users.users).to.have.lengthOf(1);
        expect(users.users).to.eql([max]);
    });

    it('getUsersList should return names of all users in array', ()=> {
        expect(users.getUsersList('room1')).to.eql(['Max']);
    });

    it('removeUser should remove user from users array', ()=> {
        expect(users.removeUser(25)).to.eql(max);
        expect(users.users).to.have.lengthOf(0);
    });
});