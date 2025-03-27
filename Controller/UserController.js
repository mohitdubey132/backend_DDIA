import prisma from '../DB/db.config.js'
import Jwt from 'jsonwebtoken' 
import bycrypt from 'bcryptjs'
// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer"

// require("dotenv").config(); // Load environment variabl
import 'dotenv/config.js'
export const createUser = async (req, res) => {
    const { name, email, password } = req.body;
     let passwordhash ;
    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  
    if (findUser) {
      return res.json({
        status: 400,
        message: "Email Already Taken . please another email.",
      });
    } 
    if (password){
         passwordhash = await bycrypt.hash(password,process.env.password_solt)
    }
  
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: passwordhash??password,
      },
    });
    if(newUser?.id){
      const token = Jwt.sign({id:newUser.id},process.env.JWT_SECRIET,{expiresIn:"1h"})     
      const response = {status:200,data:{token:token,user:newUser},message:"userCreated"}
      return res.json(response);
    }
  
    return res.json({ status: 200, data: newUser, msg: "User created." });
  };

export const login = async (req, res) => {
    const {  email, password } = req.body;
     let passwordhash ;
    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    let isVaild;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
      },
  });

  const result = await prisma.$queryRaw`
  SELECT *
  FROM public.user

  LIMIT 10;

`;

console.log(result);
    if (findUser) {
             isVaild = await bycrypt.compare(password,findUser.password)
             if(isVaild){
              const mailOptions = {
                from: process.env.EMAIL_USER, // Sender email
                to: findUser?.email, // Replace with recipient email
                subject: "User Action  🚀",
                text: "Some user has login with your account please new message inform our support team if you are not using yur account ",
                html: "<h1>Hello from Nodemailer</h1><p>This is bhgvhv a test email sent using <strong>Nodemailer</strong> in Node.js!</p>",
            };   
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Error:", error);
                } else {
                    console.log("Email sent:", info.response);
                }
            });
            const token = Jwt.sign({id:findUser.id},process.env.JWT_SECRIET,{expiresIn:"1h"})    
              return res.json({
                status: 200,
                message: "Email and password is right Taken . please another email.",
                data:findUser,
                token:token
              });
             }
    
    } 
   
  
    return res.json({ status: 401, msg: "User not found" });
  };
export const getUsers = async (req, res )=>{
  const list = await prisma.user?.findMany() 
  return res.json({status:200,data:list,message:"all users"})
}