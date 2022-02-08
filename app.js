require("dotenv").config();
const express = require("express");
app = express();
(mongoose = require("mongoose")),
  (port = process.env.PORT || 5000),
  (guestsRouter = require("./routes/guestsRouter")),
  (reservationsRouter = require("./routes/reservationsRouter")),
  (roomsRouter = require("./routes/roomsRouter"));

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

mongoose
  .connect("mongodb://0.0.0.0:27017/The-Big-Hotel")
  .then(() => {
    app.listen(port, () => {
      console.info(`start server start listening on port ${port}`);
    });
  })
  .catch((err) => console.error(err));
