const Promise = require('promise-polyfill');
const expect = require('expect');
const request = require('supertest');

import app from '../app';
// import mockRepository from '../db/mockRepository';
// const repository = mockRepository;
import MongoRepository from '../db/MongoRepository';
const repository = new MongoRepository();

const user1 = { name: 'andrew', password: '123abc' },
    user2 = { name: 'zilberman', password: '123' };

const populateUsers = done => {
    const firstUser = repository.addUser(user1.name, user1.password),
        secondUser = repository.addUser(user2.name, user2.password);

    Promise.all([firstUser, secondUser]).then(() => { done(); });
};

describe('Authorization tests', () => {
    beforeEach(populateUsers);
    afterEach(done => {
        repository.clearRepository().then(() => {
            done();
        });
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

                    repository.getUserByName(name).then(user => {
                        if (user) {
                            expect(user).toExist();
                            expect(user.password).toNotBe(password);
                            done();
                        } else {
                            done(new Error('User not added to repo'));
                        }
                    });
                });
        });

        it('should return HTTP 400 if request invalid', done => {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(() => { done(); });
        });

        it('should not create user if name in use', done => {
            request(app)
                .post('/users')
                .send({
                    name: user2.name,
                    password: '1234'
                })
                .expect(400)
                .end(() => { done(); });
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

                    repository.getUserByName(user.name).then(_user => {
                        if (_user) {
                            expect(_user.token).toBe(res.headers['x-auth']);
                            done();
                        } else {
                            done(new Error('User and its token not found in repository'));
                        }
                    });
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
                .end(() => { done(); });
        });
    });

    describe('POST /users/logout', () => {
        it('should remove auth token on logout', (done) => {
            loginAsUser2()
                .end((err, res) => {
                    if (err) return done(err);

                    const token = res.headers['x-auth'];

                    request(app)
                        .post('/users/logout')
                        .send({ token })
                        .expect(200)
                        .end(err => {
                            if (err) {
                                return done(err);
                            }

                            repository.getUserByName(user2.name).then(user => {
                                if (user) {
                                    expect(user.token).toBeFalsy();
                                    done();
                                } else {
                                    done(new Error('This user does not exist'));
                                }
                            });
                        });
                });
        });
    });

    describe('GET /users/auth', () => {
        it('should return user by his token if he is logged in', (done) => {
            loginAsUser2()
                .end((err, res) => {
                    if (err) return done(err);

                    const token = res.headers['x-auth'];

                    request(app)
                        .get('/users/auth')
                        .set('x-auth', token)
                        .expect(200)
                        .end((err, res) => {
                            if (err) return done(err);

                            expect(res.body.name).toBe(user2.name);
                            done();
                        });
                });
        });

        it('should return HTTP 404 if token is wrong', (done) => {
            loginAsUser2()
                .end((err, res) => {
                    if (err) return done(err);

                    const token = res.headers['x-auth'];

                    request(app)
                        .get('/users/auth')
                        .set('x-auth', token + 'a')
                        .expect(404)
                        .end(() => { done(); });
                });
        });
    });

    const loginAsUser2 = () => {
        return request(app)
            .post('/users/login')
            .send({
                name: user2.name,
                password: user2.password
            });
    };
});