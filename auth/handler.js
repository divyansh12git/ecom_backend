import express from "express";

const authRouter =express.Router();


authRouter.post('/auth/login',(req,res)=>{

    const email=req.body.email;
    const password=req.body.password;
    // console.log(email+password);
    //db logic
    const username="Divyansh"
    if(true){
        res.json({message:"success",name:username})
    }else{
        res.json({message:"failed"});
    }
});

authRouter.post('/auth/signup',(req,res)=>{
    
})


export default authRouter;
