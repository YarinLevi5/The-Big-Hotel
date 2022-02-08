let Room = require("../models/room");

let getAllRooms = () => {
  return new Promise((resolve, reject) => {
    Room.find({}, (err, rooms) => {
      err ? reject(err) : resolve(rooms);
    });
  });
};
let insertRoom = (isVip, haveBath, roomNumber) => {
  return new Promise((resolve, reject) => {
    let room = new Room({
      isVip,
      haveBath,
      roomNumber,
    });
    room.save((err, room) => {
      err ? reject(err) : resolve(room);
    });
  });
};

let getOneRoom = (_id) => {
  return new Promise((resolve, reject) => {
    Room.findOne({ _id }, (err, room) => {
      err ? reject(err) : resolve(room);
    });
  });
};
let updateOneRoom = (_id, newRoom) => {
  return new Promise((resolve, reject) => {
    Room.findOneAndUpdate({ _id }, { $set: newRoom }, (err, room) => {
      err ? reject(err) : resolve(room);
    });
  });
};
let deleteOneRoom = (_id) => {
  return new Promise((resolve, reject) => {
    Room.findByIdAndDelete({ _id }, (err, room) => {
      err ? reject(err) : resolve(room);
    });
  });
};

module.exports = {
  getAllRooms,
  insertRoom,
  getOneRoom,
  updateOneRoom,
  deleteOneRoom,
};
