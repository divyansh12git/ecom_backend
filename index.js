import express from "express";
import authRouter from "./auth/handler.js";
import bodyParser from "body-parser";

const server=express();
const PORT=5000;
server.use(bodyParser.urlencoded({ extended: false }))
server.use(authRouter);



server.listen(PORT,()=>console.log(`Server is running on ${PORT}`));