import jwt from 'jsonwebtoken';
import { envs } from './envs';

const JWT_SEED = envs.JWT_SEED;


export class JwtAdapter {

    static async generateToken(payload: any, duration: number = 60 * 60) {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, JWT_SEED, {
                expiresIn: duration,
                algorithm: 'HS256'
            }, (err, token) => {
                if (err) return reject(err);
                resolve(token);
            });
        });
    }

    static async validateToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, JWT_SEED, (err, decoded) => {
                if (err) return resolve(null);
                resolve(decoded as T);
            });
        });
    }
}
