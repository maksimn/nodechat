const mockRepository = {};

const users = [{
    id: 0,
    name: 'test',
    password: 'test',
    token: '0'
}];

mockRepository.addUser = function(name, password) {
    return new Promise((resolve, reject) => {
        if (users.find(u => u.name === name)) { 
            const err = new Error();
            err.code = 409;

            reject(err);
        }

        users.push({
            id: users.length,
            name,
            password,
            token: users.length.toString()
        });

        resolve({name});
    });
};

module.exports = mockRepository;