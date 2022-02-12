import mongoose from "mongoose"
const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Enter name',
  },
  gender: {
    type: String,
    required:  'Choose gender',
  },
  dateOfBirth: {
    type: Date,
    required:  'Choose date',
  },
  isVip: {
    type: Boolean,
    required: true,
  },
});
const Guest = mongoose.model("Guest", guestSchema);
module.exports = Guest;
