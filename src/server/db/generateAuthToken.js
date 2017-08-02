import jwt from 'jsonwebtoken';

const generateAuthToken = user => {
    const secret = process.env['JWT_SECRET'];
    const token = jwt.sign({id: user.id}, secret).toString();
    return token;
};

export default generateAuthToken;