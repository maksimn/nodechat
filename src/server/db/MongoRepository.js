import Promise from 'promise-polyfill';
import { MongoClient } from 'mongodb';

import {passwordHash} from './appSecurity';

const cnnString = process.env['MONGODB_URI'];

export default class MongoRepository {
    init(callback) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(cnnString, function(err, db) {
                if (err) reject(err);

                db.collection('users').createIndex({name: 1}, {unique: true}, (err, result) => {
                    if (err) reject(err);

                    console.log('An index on users.name has been created. The index name: ', result);
                    
                    db.close();
                    
                    callback();
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

    clearRepository() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(cnnString, function(err, db) {
                if(err) reject(err);

                db.collection('users').drop(err => {
                    if(err) return reject(err);
                    
                    db.close();
                    resolve();
                });
            });
        });
    }
}