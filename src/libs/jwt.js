import jwt from 'jsonwebtoken';
process.loadEnvFile();

const JWT_SEED = process.env.JWT_SEED;

export function generateToken(payload){
    return new Promise((resolve) => {
        jwt.sign(payload, JWT_SEED, {expiresIn: '1d'}, (error, token) => {
            if(error) resolve(null);
            resolve(token);
        });
    });
}