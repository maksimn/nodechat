const Promise = require('promise-polyfill');
const expect = require('expect');
const request = require('supertest');

const app = require('../app');
const mockRepository = require('../mockRepository');
const repository = mockRepository;

const user1 = {name: 'andrew', password: '123abc'},
    user2 = {name: 'zilberman', password: '123'};

const populateUsers = done => {
    const firstUser = repository.addUser(user1.name, user1.password),
        secondUser = repository.addUser(user2.name, user2.password);

    Promise.all([firstUser, secondUser]).then(() => { done(); });
};

beforeEach(populateUsers);
afterEach(done => {
    mockRepository.getUsers().length = 0;
    done();
});

describe('POST /users', () => {
    it('should create a user', (done) => {
        const name = 'example';
        const password = '123mnb!';

        request(app)
            .post('/users')
            .send({ name, password })
            .expect(201)
            .expect((res) => {
                expect(res.body.id).toExist();
                expect(res.body.name).toBe(name);
            })
            .end((err) => {
                if (err) {
                    return done(err);
                }

                const users = repository.getUsers();
                const user = users.find(u => u.name === name);
                if (user) {
                    expect(user).toExist();
                    expect(user.password).toNotBe(password);
                    done();
                } else {
                    done(new Error('User not added to repo'));
                }
            });
    });

    it('should return HTTP 400 if request invalid', done => {
        request(app)
            .post('/users')
            .send({})
            .expect(400)
            .end(done);
    });

    it('should not create user if name in use', done => {
        request(app)
            .post('/users')
            .send({
                name: 'andrew',
                password: '123'
            })
            .expect(400)
            .end(done);
    });
});

describe('POST /users/login', () => {
    it('should login user and return auth token', (done) => {
        const user = user2;

        request(app)
            .post('/users/login')
            .send({
                name: user.name,
                password: user.password
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                const users = repository.getUsers();
                const _user = users.find(u => u.name === user.name);

                if (_user) {
                    expect(_user.token).toBe(res.headers['x-auth']);
                    done();
                } else {
                    done(new Error('User and its token not found in repository'));
                }
            });
    });

    it('should reject invalid login', (done) => {
        request(app)
            .post('/users/login')
            .send({
                name: user2.name,
                password: user2.password + '1'
            })
            .expect(401)
            .expect((res) => {
                expect(res.headers['x-auth']).toNotExist();
            })
            .end(done);
    });
});

describe('POST /users/logout', () => {
    it('should remove auth token on logout', (done) => {
        repository.loginUser(user2.name, user2.password).then(result => {
            const {token} = result;

            request(app)
                .post('/users/logout')
                .send({token})
                .expect(200)
                .end(err => {
                    if (err) {
                        return done(err);
                    }

                    const users = repository.getUsers();
                    const user = users.find(u => u.name === user2.name);

                    if (user) {
                        expect(user.token).toBeFalsy();
                        done();
                    } else {
                        done(new Error('This user does not exist'));
                    }
                });
        }).catch(e => {
            done(e);
        });
    });
});