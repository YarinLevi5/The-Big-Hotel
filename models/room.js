let mongoose = require("mongoose");
const roomSchema = new mongoose.Schema({
  isVip: {
    type: Boolean,
    require: true,
  },
  haveBath: {
    type: Boolean,
    require: true,
  },
  roomNumber: {
    type: Number,
    require: true,
  },
});
const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
