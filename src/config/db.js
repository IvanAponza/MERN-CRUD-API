import mongoose from 'mongoose';

export const connectDB = async() => {
    try {
        await mongoose.connect('mongodb://localhost/auth-task');
        console.log('[MONGOD] is coneted 🔥');
    } catch (error) {
        console.log(error);
    }
}