import mongoose from "mongoose"
const reservationSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: 'Choose room ID',
  },
  capacity: {
    type: Number,
    required:  'Enter capacity',
  },
});
const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
