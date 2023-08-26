import mongoose from "mongoose";
export const connectToDB = async ()=>{
    mongoose.set('strictQuery', true);
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName:'share_prompt',
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('Connected to db');
    } catch (error) {
        console.log(error);
    }
}