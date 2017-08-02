import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Promise from 'promise-polyfill';

export const generateAuthToken = user => {
    const secret = process.env['JWT_SECRET'];
    const token = jwt.sign({id: user.id}, secret).toString();
    return token;
};

export const passwordHash = password => {
    return new Promise((resolve, reject) => {
        const rounds = 5;

        bcrypt.genSalt(rounds, (err, salt) => {
            if (err) reject(err);

            bcrypt.hash(password, salt, (err, hash) => {
                if (err) reject(err);

                resolve(hash);
            });
        });
    });
};