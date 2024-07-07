import mongoose from 'mongoose';

export const connect = async()=>{
    const mongoDB = process.env.DBURL;
    try {
        await mongoose.connect(mongoDB);
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}