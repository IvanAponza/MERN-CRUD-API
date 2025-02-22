import jwt from 'jsonwebtoken';
process.loadEnvFile();
const JWT_SEED = process.env.JWT_SEED;


export const authRequired = (req, res, next) => {
    // console.log(req.headers);
    const {token} = req.cookies;
    if(!token) return res.status(401).json({message: 'Not token autorization denied'});
    jwt.verify(token, JWT_SEED, (error, user) => {
        if(error) return res.status(403).json({message: 'Invalid token'});
        // console.log(user);
        req.user = user;
        next();
    })

}