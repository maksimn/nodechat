function MockRepository() {}

MockRepository.__users = [{
    id: 0,
    name: 'test',
    password: 'test',
    token: '0'
}];

MockRepository.addUser = function(name, password) {
    const users = MockRepository.__users;

    if (users.find(u => u.name === name)) { 
        const err = new Error();
        err.code = 409;

        throw err;
    }

    users.push({
        id: users.length,
        name,
        password,
        token: users.length.toString()
    });
};

module.exports = MockRepository;