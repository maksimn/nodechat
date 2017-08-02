import Promise from 'promise-polyfill';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const cnnString = process.env['MONGODB_URI'];

export default class MongoRepository {
    addUser(name, password) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(cnnString, function(err, db) {
                if (err) reject(err);

                const rounds = 5;

                bcrypt.genSalt(rounds, (err, salt) => {
                    if (err) { reject(err); }

                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) { reject(err); }

                        const userDoc = { name, password: hash, token: null };
                        db.collection('users').insert(userDoc, (err, inserted) => {
                            if(err) reject(err);

                            db.close();
                            const insertedUser = inserted.ops[0];
                            resolve({
                                id: insertedUser._id, 
                                name: insertedUser.name}
                            );
                        });
                    });
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
                    if(err) reject(err);
                    
                    db.close();
                    resolve();
                });
            });
        });
    }
}