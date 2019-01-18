class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        var user = {
            id: id,
            name: name,
            room: room
        };
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        var user;
        for (var i = 0; i < this.users.length; i++) {
            if(this.users[i].id === id) {
                user = this.users[i];
                this.users.splice(i, 1);
                break;
            }
        }
        return user;
    }
    getUser(id) {
        for (var i = 0; i < this.users.length; i++) {
            if(this.users[i].id === id) {
                return this.users[i];
            }
        }
    }
    getUsersList(room) {
        var usersNames = [];
        for (const user of this.users) {
            if(user.room === room) usersNames.push(user.name);
        }
        return usersNames;
    }
}

module.exports = {
    Users
};