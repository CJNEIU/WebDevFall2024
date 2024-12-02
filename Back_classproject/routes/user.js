import express from "express";
import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", (req, res, next) => {
     
  bcrypt
    .hash(req.body.password, 10) // hash method takes 1) input we want hash/encrpt 2) the salting/salt(the longer the salt,the longer it will take to decrypt)
    .then((hash) => {
      //   console.log(req.body);
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user.save().then((result) => {
        res.status(201).json({ success: true, data: result });
      });
    })
    .catch((error) => {
      if (error === 11000) {
        console.log("User already exist!");
        res.status(409).json({
          success: false,
          data: "User already exist!",
        });
      } else {
        console.log("Error saving.... ", error);
        res.status(409).json({
          success: false,
          data: error,
        });
      }
    });
});

router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          success: false,
          data: "Could not find user",
        });
      }
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (result) {
        return res.status(401).json({
          success: false,
          data: "password not found",
        });
      }

      const token = jwt.sign(
        { email: req.body.email, userId: req.body.password },
        "secret this should be longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        success: true,
        token: token,
        expiresIn: 3600 //expires in 1 hour (seconds)
      });
    }).catch(err =>{
        console.log(err)
    });
});

export default router;
