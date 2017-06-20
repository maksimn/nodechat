const Promise = require('promise-polyfill');

const mockRepository = {};

const users = [{
    id: 0,
    name: 'test',
    password: 'test',
    token: []
}];

mockRepository.addUser = (name, password) => {
    return new Promise((resolve, reject) => {
        if (users.find(u => u.name === name)) { 
            const err = new Error();
            err.code = 409;

            reject(err);
        }

        const len = users.length;

        users.push({
            id: len,
            name,
            password,
            token: []
        });

        resolve({name});
    });
};

mockRepository.loginUser = (name, password) => {
    return new Promise((resolve, reject) => {
        const user = users.find(u => u.name === name && u.password === password);

        if (user) {
            user.token = [user.id.toString()];

            const userData = {
                id: user.id,
                name: user.name,
                token: user.token[0]
            };

            resolve(userData);
        } else {
            reject();
        }
    });    
};

mockRepository.findUserByToken = token => {
    return new Promise((resolve, reject) => {
        const user = users.find(u => u.token.includes(token));

        if (user) {
            const {id, name} = user;

            resolve({id, name});
        } else {
            reject();
        }
    });  
};

module.exports = mockRepository;