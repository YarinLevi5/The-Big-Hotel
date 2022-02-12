import mongoose from "mongoose"
const roomSchema = new mongoose.Schema({
  isVip: {
    type: Boolean,
    required: true,
  },
  haveBath: {
    type: Boolean,
    required: true,
  },
  roomNumber: {
    type: Number,
    required: 'Enter room number',
  },
});
const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
