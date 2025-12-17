// require('dotenv').config({path: './env'});
// //this also works but it causes inconsistency here.
import dotenv from "dotenv"
import app from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({ path : '.env' });

/*// function connectDB{
//   //code to connect
// }
// connectNB();

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
app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}`);
});
connectDB()
.catch((err) => {
  console.log("Failed to connect DB:", err);
});