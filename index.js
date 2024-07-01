import express from "express";
import authRouter from "./auth/handler.js";

import { CreateUser, getUserData } from "./db/handler.js";
import { getAllItems,addToCart, createCart } from "./db/carthandler.js";

import bodyParser from "body-parser";

const server=express();
const PORT=5000;
server.use(bodyParser.urlencoded({ extended: true }))
server.use(authRouter);


server.get('/userdata',async(req,res)=>{
    const email=req.headers.email;

    if(!email){
        res.status(400).send({"message":"sendEmail"});
        return;
    }
    const data=await getUserData(email);
    res.send({data:data});
});

server.post('/addtocart',async(req,res)=>{
    console.log("Hi");
    const email=req.body.email;
    const prodId=req.body.productId;
    console.log(email);
    if(!email){
        res.status(400).send({"message":"sendEmail"});
        return;
    }
    await addToCart(email,prodId).then(()=>res.sendStatus(200)).catch((e)=>{console.log(e);req.sendStatus(400)});
})

server.get('/getcartitems',async(req,res)=>{

    const email=req.headers.email;
    console.log(email);

    if(email==null || email==undefined){
        res.status(400).send({"message":"please send Email"});
        return
    }
    const items=await getAllItems(email);
    res.send({data:items});
});

server.listen(PORT,()=>console.log(`Server is running on ${PORT}`));