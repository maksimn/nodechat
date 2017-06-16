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

        const prevLength = users.length;

        users.push({
            id: prevLength,
            name,
            password,
            token: [prevLength.toString()]
        });

        resolve({
            name, 
            token: users[prevLength].token[0]
        });
    });
};

module.exports = mockRepository;