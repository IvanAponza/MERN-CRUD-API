import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'name is required'],
        trim: true,
    },
    email:{
        type:String,
        required:[true, 'email is required'],
        unique:true,
        trim: true,
    },
    password:{
        type:String,
        required:[true, 'password is required'],
        unique:true,
    },
    roles:{
        type:[String],
        default: ['USER_ROLE'],
        enum: ['ADMIN_ROL', 'USER_ROLE'],
        trim: true,
    },
    img: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false,
});

export default mongoose.model('User', userSchema);