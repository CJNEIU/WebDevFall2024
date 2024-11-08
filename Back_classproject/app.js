import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Post from "./model/post.js";

mongoose
  .connect(
    process.env.MONGODB_KEY
  )
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
    "Origin, X-Requested-With,Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  // const post = req.body;

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  console.log(post);
  post.save().then((result) => {
    console.log(result);
    res.status(201).json({ success: true, postId: result._id });
  });
});

app.get("/api/posts", (req, res) => {
  Post.find().then((data) => {
    res.status(200).json({ success: true, data: data });
  });
});

app.delete("/api/posts/:id", (req, res) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ success: true });
  });
});

export default app;
