let Guest = require("../models/guest");

let getAllGuests = () => {
  return new Promise((resolve, reject) => {
    Guest.find({}, (err, guests) => {
      err ? reject(err) : resolve(guests);
    });
  });
};
let insertGuest = (name, gender, dateOfBirth, isVip) => {
  return new Promise((resolve, reject) => {
    let guest = new Guest({
      name,
      gender,
      dateOfBirth,
      isVip,
    });
    guest.save((err, guest) => {
      err ? reject(err) : resolve(guest);
    });
  });
};

let getOneGuest = (_id) => {
  return new Promise((resolve, reject) => {
    Guest.findOne({ _id }, (err, guest) => {
      err ? reject(err) : resolve(guest);
    });
  });
};
let updateOneGuest = (_id, newGuest) => {
  return new Promise((resolve, reject) => {
    Guest.findOneAndUpdate({ _id }, { $set: newGuest }, (err, guest) => {
      err ? reject(err) : resolve(guest);
    });
  });
};
let deleteOneGuest = (_id) => {
  return new Promise((resolve, reject) => {
    Guest.findByIdAndDelete({ _id }, (err, guest) => {
      err ? reject(err) : resolve(guest);
    });
  });
};

module.exports = {
  getAllGuests,
  insertGuest,
  getOneGuest,
  updateOneGuest,
  deleteOneGuest,
};
