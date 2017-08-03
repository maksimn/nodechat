import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Promise from 'promise-polyfill';

export const generateAuthToken = user => {
    const secret = process.env['JWT_SECRET'];
    const id = user.id ? user.id : user._id;
    const token = jwt.sign({id}, secret).toString();
    return token;
};

export const passwordHash = password => {
    return new Promise((resolve, reject) => {
        const rounds = 5;

        bcrypt.genSalt(rounds, (err, salt) => {
            if (err) return reject(err);

            bcrypt.hash(password, salt, (err, hash) => {
                if (err) return reject(err);

                resolve(hash);
            });
        });
    });
};

export const comparePasswordWithItsHash = (password, passwordHash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, (err, result) => {
            if (err) return reject(err);
            
            resolve(result);
        });
    });
};