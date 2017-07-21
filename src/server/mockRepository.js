const Promise = require('promise-polyfill');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const mockRepository = {};

// Схема Данных:

// user = {
//     id: 0,
//     name: 'test',
//     password: 'adfkdfkgjlkdsfvmxcvm',
//     token: 'dsfadf;l.sdafsdaf.sadfsdfdsfsadfasd'
// };

// message = {
//     id: 0,
//     username: '__Admin',
//     text: 'Добро пожаловать в чат.'
// };

const users = [];
const chatMessages = [];

const generateAuthToken = user => {
    const token = jwt.sign({id: user.id}, '123abc').toString();
    return token;
};

mockRepository.addUser = (name, password) => {
    return new Promise((resolve, reject) => {
        if (users.find(u => u.name === name)) { 
            const err = new Error('A user with given name already exists.');
            err.code = 409;

            reject(err);
        }

        const rounds = 5;

        bcrypt.genSalt(rounds, (err, salt) => {
            if (err) {
                reject(err);
            }

            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }

                const id = users.length;
                const user = { id, name, password: hash, token: null };
                users.push(user);
                resolve({ id, name });
            });
        });
    });
};

mockRepository.loginUser = (name, password) => {
    return new Promise((resolve, reject) => {
        const user = users.find(u => u.name === name);

        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = generateAuthToken(user);
                    user.token = token;

                    resolve({
                        user: {
                            id: user.id,
                            name: user.name
                        },
                        token
                    });
                } else {
                    reject();
                }
            });
        } else {
            reject();
        }
    });    
};

mockRepository.findUserByToken = token => {
    return new Promise((resolve, reject) => {
        const user = users.find(u => u.token === token);

        if (user) {
            const {id, name} = user;

            resolve({id, name});
        } else {
            reject();
        }
    });  
};

mockRepository.logoutUser = token => {
    return new Promise(resolve => {
        const user = users.find(u => u.token.includes(token));
        const tokens = user.token;

        tokens.splice(tokens.indexOf(token), 1);

        resolve();
    });  
};

mockRepository.chatMessages = () => {
    return Promise.resolve(chatMessages);
};

mockRepository.addChatMessage = message => {
    const newId = chatMessages.length;
    const newMessage = message;
    newMessage.id = newId;
    chatMessages.push(newMessage);
    
    return Promise.resolve(newMessage);
};

mockRepository.getUsers = () => {
    return users;
};

module.exports = mockRepository;