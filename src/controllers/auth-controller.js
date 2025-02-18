import Users from '../models/user-model.js';

export const register = async(req, res) => {
    const {username, email, password} = req.body;

    
    try {
        const userFound = await Users.findOne({email});
        if(userFound) return res.status(400).json({message: 'User already exist'});

        const user = new Users({
            username,
            email,
            password,
        });
        const newUser = await user.save();
        return res.status(200).json(newUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}