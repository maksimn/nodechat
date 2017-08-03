import Promise from 'promise-polyfill';
import { MongoClient } from 'mongodb';

import {
    passwordHash, 
    generateAuthToken, 
    comparePasswordWithItsHash
} from './appSecurity';

const cnnString = process.env['MONGODB_URI'];

export default class MongoRepository {
    init(callback) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(cnnString, function(err, db) {
                if (err) return reject(err);

                db.collection('users').createIndex({name: 1}, {unique: true}, (err, result) => {
                    if (err) return reject(err);

                    console.log('An index on users.name has been created. The index name: ', result);
                    
                    db.close();
                    
                    callback();
                });
            });
        });
    }

    loginUser(name, password) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(cnnString, function(err, db) {
                if (err) return reject(err);

                const users = db.collection('users');
                
                users.findOne({name}, (err, userDoc) => {
                    if (err) return reject(err);

                    if (userDoc) {
                        comparePasswordWithItsHash(password, userDoc.password).then(result => {
                            if (result) {
                                const token = generateAuthToken(userDoc);

                                users.update({name}, {'$set': {token}}, (err, updated) => {
                                    if (err) return reject(err);

                                    db.close();
                                    resolve({
                                        user: {
                                            id: userDoc._id,
                                            name: userDoc.name
                                        },
                                        token
                                    });
                                });
                            } else {
                                db.close();
                                reject();
                            }
                        }).catch(() => { 
                            db.close();    
                            reject(); 
                        });
                    } else {
                        db.close();
                        reject();
                    }
                });
            });
        });
    }

    addUser(name, password) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(cnnString, function(err, db) {
                if (err) return reject(err);

                passwordHash(password).then(hash => {
                    const userDoc = { name, password: hash, token: null };
                    db.collection('users').insert(userDoc, (err, inserted) => {
                        if (err) return reject(err);

                        db.close();
                        const insertedUser = inserted.ops[0];
                        resolve({
                            id: insertedUser._id,
                            name: insertedUser.name
                        });
                    });
                }).catch(e => {
                    db.close();
                    reject(e);
                });
            });
        });
    }

    getUserByName(name) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(cnnString, function(err, db) {
                if (err) reject(err);
                
                db.collection('users').findOne({name}, (err, userDoc) => {
                    if (err) reject(err);
                    
                    db.close();

                    resolve(userDoc);
                });
            });
        });
    }

    findUserByToken(token) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(cnnString, function(err, db) {
                if (err) reject(err);
                
                db.collection('users').findOne({token}, (err, userDoc) => {
                    if (err) reject(err);
                    
                    db.close();

                    if (userDoc) {
                        resolve({
                            id: userDoc._id,
                            name: userDoc.name
                        });
                    } else {
                        reject();
                    }
                });
            });
        });
    }

    logoutUser(token) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(cnnString, function(err, db) {
                if (err) return reject(err);

                const users = db.collection('users');

                users.findOne({token}, (err, userDoc) => {
                    if (err) return reject(err);
                    
                    if (userDoc) {
                        const query = {_id: userDoc._id};
                        users.update(query, {'$set': { token: null }}, (err, updated) => {
                            if (err) return reject(err);

                            db.close();
                            resolve();
                        });
                    } else {
                        db.close();
                        reject();
                    }
                });            
            });
        });
    }

    clearRepository() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(cnnString, function(err, db) {
                if(err) return reject(err);

                db.collection('users').drop(err => {
                    if(err) return reject(err);
                    
                    db.close();
                    resolve();
                });
            });
        });
    }
}