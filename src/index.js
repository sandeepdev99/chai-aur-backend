// require('dotenv').config({path: './env'});
// //this also works but in causs inconsistency.

import dotenv from "dotenv"
import express from "express";
import connectDB from "./db/index.js";

dotenv.config({ path : '.env' });
console.log("PORT:", process.env.PORT);
const app = express()

// function connectDB{
//   //code to connect
// }
// connectNB();
/*
;(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error", () => {
      console.log("ERR:", error);
      throw error
    })

    app.listen(process.env.PORT, ()=> {
      console.log(`App is listening on port ${process.env.PORT}`);
    })
  } catch (error) {
    console.log("ERROR",error)
    throw err
  }
})()*/

//importing conection file for reusable and clean index.js
connectDB()
.then(() => {
    app.on("error", (error) => {
      console.log("ERR before connection:", error);
      throw error
    })
    app.listen(process.env.PORT, ()=> {
      console.log(`server is listening on port ${process.env.PORT}`);
    })
  })
.catch((err) => {
  console.log("Failed to connect DB:", err);
});
