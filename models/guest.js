let mongoose = require("mongoose");
const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  dateOfBirth: {
    type: Date,
    require: true,
  },
  isVip: {
    type: Boolean,
    require: true,
  },
});
const Guest = mongoose.model("Guest", guestSchema);
module.exports = Guest;
