import crypto from 'crypto';

const jwt = require('jsonwebtoken');

import dotenv from 'dotenv';
dotenv.config();

class Auth {
    public static encryptPassword(password: string): {} {
        const salt = crypto.randomBytes(16).toString('hex'); // gera um salt aleatório
        const hash = crypto.pbkdf2Sync(password, salt + (process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY : '7H2D6F8J0K4L9Z3X5C7V1B3N5M7Q9R2E6W8Y0U1I3O5P7A4S6D8F0G2H4J6K8L1'), 1000, 64, 'sha512').toString('hex');

        return {
            salt,
            hash
        };
    }

    public static comparePasswords(password: string, salt: string, hash: string): boolean {
        const passwordHash = crypto.pbkdf2Sync(password, salt + (process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY : '7H2D6F8J0K4L9Z3X5C7V1B3N5M7Q9R2E6W8Y0U1I3O5P7A4S6D8F0G2H4J6K8L1'), 1000, 64, 'sha512').toString('hex');

        return hash === passwordHash;
    }

    public static createToken(payload: any) {
        const token = jwt.sign(payload, process.env.PRIVATE_KEY_TOKEN ? process.env.PRIVATE_KEY_TOKEN : '8-2jU-$7V7b5-6A5N5w8$N2Jn-$V7-5$N-8vAn5nNy5Y5a$-B8X3$4ALH1Q9M24BSRWTP8J6YJ5FKO7VE0G', {
            expiresIn: '24h'
        });
        return token;
    }

    public static checkToken(token: string) {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY_TOKEN ? process.env.PRIVATE_KEY_TOKEN : '8-2jU-$7V7b5-6A5N5w8$N2Jn-$V7-5$N-8vAn5nNy5Y5a$-B8X3$4ALH1Q9M24BSRWTP8J6YJ5FKO7VE0G', (err: any, decoded: string) => {
            if (err) {
                console.log(err);
                return false;
            }
            return decoded;
        })

        return decoded;
    }
}

export default Auth;