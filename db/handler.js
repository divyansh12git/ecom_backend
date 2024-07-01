import mongoose from "mongoose";

const connectionUrl="mongodb://127.0.0.1:5555/User"
const userSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    contact:String,
    gender:String
});
const CreateUser=async(data)=>{
    let client=null;
    try{
         client=await mongoose.connect(connectionUrl).then(()=>console.log("Connected to db"));
    }catch(e){
        console.log(e);
    }
    const User=mongoose.model("User",userSchema);
    const user1=new User(data);
    await User.insertMany([user1]).then(()=>console.log("user added to db")).catch((err)=>console.log(err));
    await mongoose.connection.close();

}
const getUserData=async(useremail)=>{
    console.log(useremail)
    let client=null;
    try{
         client=await mongoose.connect(connectionUrl).then(()=>console.log("Connected to db"));
    }catch(e){
        console.log(e);
    }
    const User=mongoose.model("User",userSchema);
    let data=null;
    await User.findOne({email:useremail}).then((doc)=>{
        // console.log(doc)
        data=doc;
    }).catch((e)=>console.log(e));
    // console.log(data);
    await mongoose.connection.close();
    return data;
}
export {CreateUser,getUserData}