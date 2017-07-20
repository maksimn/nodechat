const Promise = require('promise-polyfill');
const jwt = require('jsonwebtoken');

const mockRepository = {};

const users = [{
    id: 0,
    name: 'test',
    password: 'adfkdfkgjlkdsfvmxcvm',
    token: 'dsfadf;l.sdafsdaf.sadfsdfdsfsadfasd'
}];

const chatMessages = [{
    id: 0,
    username: '__Admin',
    text: 'Добро пожаловать в чат.'
}];

const generateAuthToken = user => {
    const token = jwt.sign({id: user.id.toString()}, '123abc').toString();
    user.token = token;
    return token;
};

mockRepository.addUser = (name, password) => {
    return new Promise((resolve, reject) => {
        if (users.find(u => u.name === name)) { 
            const err = new Error('A user with given name already exists.');
            err.code = 409;

            reject(err);
        }

        const id = users.length;
        const user = {id, name, password, token: null};

        users.push(user);
        resolve({id, name});
    });
};

mockRepository.loginUser = (name, password) => {
    return new Promise((resolve, reject) => {
        const user = users.find(u => u.name === name && u.password === password);

        if (user) {
            const token = generateAuthToken(user);

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

module.exports = mockRepository;