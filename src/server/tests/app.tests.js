const Promise = require('promise-polyfill');
const expect = require('expect');
const request = require('supertest');

const app = require('../app');
const mockRepository = require('../mockRepository');
const repository = mockRepository;

const populateUsers = done => {
    const firstUser = repository.addUser('andrew', '123abc'),
          secondUser = repository.addUser('zilberman', '123');

    Promise.all([firstUser, secondUser]).then(() => { done(); });
};

before(populateUsers);

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