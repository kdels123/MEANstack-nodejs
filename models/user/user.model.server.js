const mongoose = require('mongoose');
const userSchema = require('./user.schema.server');
const userModel = mongoose.model('UserModel', userSchema);

function createUser(user) {
    return userModel.create(user)
}

function findAllUsers() {
    return userModel.find();
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials, {username: 1});
}

function findByUsername(username) {
    return userModel.findOne({username: username});
}

function findByUsernameAndPassword(credentials){
    return userModel.find(
        {username: credentials.username, password: credentials.password})
}

function updateUser(user) {
    return userModel.findOneAndUpdate(
        {username: user.username},
        { $set: {
                firstName : user.firstName,
                lastName : user.lastName,
                email: user.email
            }
        });
}

const api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUserByCredentials: findUserByCredentials,
    updateUser: updateUser,
    findByUsername: findByUsername,
    findByUsernameAndPassword: findByUsernameAndPassword
};

module.exports = api;