import mongoose from "mongoose";
const connectionUrl="mongodb://127.0.0.1:5555/User"

const cartSchema=new mongoose.Schema({
    email:String,
    productsId:[String],
})

const getAllItems=async(email)=>{
    let client=null;
    try{
         client=await mongoose.connect(connectionUrl).then(()=>console.log("Connected to db"));
    }catch(e){
        console.log(e);
    }

    const Cart=mongoose.model("cart",cartSchema);
    let data=[];
    await Cart.findOne({email:email}).then((doc)=>{data=doc.productsId});

    await mongoose.connection.close().then(()=>console.log("closed"));;
    return data;
}

const createCart=async(email)=>{
    let client=null;
    try{
         client=await mongoose.connect(connectionUrl).then(()=>console.log("Connected to db"));
    }catch(e){
        console.log(e);
    }
    const Cart=mongoose.model("cart",cartSchema);
    await Cart.insertMany([{email:email,productsId:[]}]);

    await mongoose.connection.close().then(()=>console.log("closed"));
}
const addToCart=async(email,prodId)=>{
    let client=null;
    try{
         client=await mongoose.connect(connectionUrl).then(()=>console.log("Connected to db"));
    }catch(e){
        console.log(e);
    }
    
    const Cart=mongoose.model("cart",cartSchema);
    let data=[];
    await Cart.findOne({email:email}).then((doc)=>{data=doc.productsId});
    data.push(prodId);
    await Cart.findOneAndUpdate({email:email},{productsId:data}).then(
        ()=>{console.log("product with id: "+prodId+" added")}
    );


    await mongoose.connection.close().then(()=>console.log("closed"));;
}
export {addToCart,getAllItems,createCart};