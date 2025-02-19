import Users from '../models/user-model.js';
import {bcryptAuth} from '../libs/bcrypt.js';
import { generateToken } from '../libs/jwt.js';

export const register = async(req, res) => {
    const {username, email, password} = req.body;

    try {
        const userFound = await Users.findOne({email});
        if(userFound) return res.status(400).json({message: 'User already exist'});

        const user = new Users({ username, email, password });

        user.password = bcryptAuth.hash(password);

        const newUser = await user.save();

        const token = await generateToken({id: newUser._id});

        res.cookie("token", token);

        return res.status(200).json({
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            roles: newUser.roles,
            img: newUser.img,
            createdAt:newUser.createdAt,
            updatedAt:newUser.updatedAt,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}