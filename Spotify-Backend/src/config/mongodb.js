import mongoose from 'mongoose';
 

const connectDB = async()=>{
    mongoose.connection.on('connected',()=>{
        console.log('connected successfully');
    })
    await mongoose.connect(`{process.env.MONGODB_URI}/spotify`);
}
export default  connectDB;