import mongoose from "mongoose";

const connectionUrl="mongodb://127.0.0.1:27017/user"
const connectToDb=()=>{
    const client=mongoose.connect()

    const userSchema=new mongoose.Schema({
        firstName:String,
        lastName:String,
        email:String,
        password:String,
        contact:String,
        gender:String
        });
    const user=new userSchema({
        firstName:"Divyansh",
        lastName:"Gupta",
        email:"divyanshgupta1811@gmail.com",
        password:"456",
        contact:"999999999",
        gender:"Male"
    })

}