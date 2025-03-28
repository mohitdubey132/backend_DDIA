import 'dotenv/config.js'
import express from 'express';
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

    console.log("app is working on port -gh",port)
 })









