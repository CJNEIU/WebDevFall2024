import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Post from "./model/post.js";
import postRoutes from './routes/post.js';
import userRoutes from './routes/user.js';

mongoose
  .connect(process.env.MONGODB_KEY)
  .then(() => {
    console.log("conneted to DB");
  })
  .catch(() => {
    console.log("connection failed");
  });

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false })); //used for URL encoding

// adding header data

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/posts/', postRoutes);
app.use('/api/user/', userRoutes);



export default app;
