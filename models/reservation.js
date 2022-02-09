let mongoose = require("mongoose");
const reservationSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    require: true,
  },
  capacity: {
    type: Number,
    require: true,
  },
});
const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
