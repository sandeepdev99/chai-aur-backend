import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import e from "express";

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,//*
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json({limit: '10kb'}));
app.use(express.urlencoded({ extended: true, limit: '10kb'}));
app.use(express.static('public'));

app.use(cookieParser());

//routes import
import router from "./routes/user.routes.js";


//routes declaration
app.use("/api/v1/users", router);
export default app;