const mockRepository = {};

const users = [{
    id: 0,
    name: 'test',
    password: 'test',
    token: []
}];

mockRepository.addUser = function(name, password) {
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

module.exports = mockRepository;