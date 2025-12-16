import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
// import Student from "./models/student.js";
// import studentRouter from "./routers/studentRouter.js";
import userRouter from "./routers/userRouter.js";
import jwt from "jsonwebtoken";

const app = express();

app.use(bodyParser.json());

app.use(
  (req, res, next)=>{
    const value = req.header("Authorization")
    if(value != null){
      const token = value.replace("Bearer ", "");     //day 06, 1.45
      jwt.verify(token, "cbc6503", 
        (err, decoded)=>{
          if(decoded == null){
            res.status(401).json({
              message : "Unauthorized access"
            })
          }else{
            req.user = decoded //setting req.user to the decoded payload data. payload data means data sent to frontend while creating the token
            next();
          }
        }
      )
    }else{
      req.user = decoded
      next();
    }
    
  }
)

const connectionString = "mongodb+srv://kenway:1234@edward.sh6tjft.mongodb.net/?appName=Edward"

mongoose.connect(connectionString).then(
  ()=>{
    console.log("Database connected")
  }
).catch(
  ()=>{
    console.log("Database connection failed")
  }
)



// app.use("/students",studentRouter);
app.use("/users",userRouter); //all routes starting with /users will be handled by userRouter
app.use("/products", productRouter);


app.listen(5000,
  ()=>{
    console.log("server started")
  }
);