import express from "express";
import { getUserData,CreateUser } from "../db/handler.js";
import { createCart } from "../db/carthandler.js";
const authRouter =express.Router();


authRouter.post('/auth/login',async(req,res)=>{

    const email=req.body.email;
    const password=req.body.password;
    console.log(email);
    //db logic
    const user=await getUserData(email);
    console.log(user);
    if(!user){
        res.send({"message":"User not found"});
        return
    }
    //validation
    if(password.toString()==user.password.toString()){
        res.json({message:"success",userdata:user})
    }else{
        res.json({message:"failed"});
    }
});

authRouter.post('/auth/signup',async(req,res)=>{
    const data={...req.body};
    // console.log(data);
    if(data.password==null){
        res.status(401).json({message:"password required"});
    }
    if(data.email==null){
        res.status(401).json({message:"email required"});
    }
    const userdata={
        firstName:data.firstName,
        lastName:data.lastName,
        email:data.email,
        password:data.password,
        contact:data.contact || "",
        gender:(data.gender || "Male")
    }
    await createCart(data.email);
    await CreateUser(userdata).then(()=>res.json({message:"user added"}))
                    .catch((e)=>{
                        console.log(e);res.send({mssage:"some error occured"})
    });
    
})


export default authRouter;
