import 'dotenv/config.js'
import express from 'express';
import os from 'node:os'
 const app = express()
 const port = process.env.PORT||3000;
 // * Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



 app.get("/",(req,res)=>{
 return res.send("ffffffffff")
 })
 
// * Routes file
import routes from "./Routes/index.js";


// console.log(solt)
app.use(routes);
 app.listen(port,()=>{
   console.log("Total Memory (RAM):", os.totalmem(), "bytes");
console.log("Total Memory (GB):", (os.totalmem() / (1024 ** 3)).toFixed(2), "GB");
    console.log("app is working on port",port)
 })









