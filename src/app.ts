require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
let port = process.env.PORT || 5000;
let app =express()
let guestsRouter = require("../routes/guestsRouter") 
let reservationsRouter =require( "../routes/reservationsRouter")
let roomsRouter=require( "../routes/roomsRouter")

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));
app.use("/guests", guestsRouter);
app.use("/reservations", reservationsRouter);
app.use("/rooms", roomsRouter);
app.all('/*',(req,res)=>{
    res.status(404).sendFile(`${process.cwd()}/public/404.html` )
})

mongoose
  .connect("mongodb://0.0.0.0:27017/The-Big-Hotel")
  .then(() => {
    app.listen(port, () => {
      console.info(`start server start listening on port ${port}`);
    });
  })
  .catch((err) => console.error(err));
