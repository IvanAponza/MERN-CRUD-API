import Users from '../models/user-model.js';
import {bcryptAuth} from '../libs/bcrypt.js';
import { generateToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
process.loadEnvFile();
const JWT_SEED = process.env.JWT_SEED

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

export const login = async(req, res) => {
    const {email, password} = req.body;

    try {
        const userFound = await Users.findOne({email});
        if(!userFound) return res.status(400).json({message: 'User not found'});

        const isMatch = bcryptAuth.compare(password, userFound.password);
        if(!isMatch) return res.status(400).json({message: 'Credential invalid'})

        const token = await generateToken({id: userFound._id});
        
        res.cookie("token", token);

        return res.status(200).json({
            id: userFound._id,
            email: userFound.email,
            roles: userFound.roles,
            img: userFound.img,
            createdAt:userFound.createdAt,
            updatedAt:userFound.updatedAt,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}

export const getUsers = async(req, res) => {
    try {
        const users = await Users.find({});
        return res.status(200).json({users});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}
export const perfil = async(req, res) => {
    try {
        const userFound = await Users.findById(req.user.id);

        if(!userFound) return res.status(400).json({message: 'User not found'});
        
        const {id, username, email, roles, img, createdAt, updatedAt} = userFound;
        return res.status(200).json({id, username, email, roles, img, createdAt, updatedAt });
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: 'Internal Server Error'});
    }
}
export const updateUser = async(req, res) => {
    try {
        const userFound = await Users.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if(!userFound) return res.status(400).json({message: 'User not found'});

        return res.status(200).json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            roles: userFound.roles,
            img: userFound.img,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: 'Internal Server Error'});
    }
}
export const deleteUser = async(req, res) => {
    try{
        const userFound = await Users.findByIdAndDelete(req.params.id);

        if(!userFound) return res.status(400).json({message: 'User not found'});

        return res.status(200).json({message: 'User deleted successfully!'});

    } catch(error){
        console.log(error);
        return res.status(400).json({message: 'Internal Server Error'});
    }
}

export const verifyToken = async(req, res) => {
    const token = req.cookies;
    if(!token) return res.status(401).json({message: 'Unauthorized'});

    jwt.verify(token, JWT_SEED, async(error, user) => {
        if(error) return res.status(401).json({message: 'Unauthorized'});

        const userFound = await Users.findById(user.id);

        if(!userFound) return res.status(401).json({message: 'Unauthorized'});

        return res.status(200).json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email
        });
    });
}

export const logout = async(req, res) => {
    res.cookie('token', "", {expires: new Date(0)});
    return res.sendStatus(200);
}