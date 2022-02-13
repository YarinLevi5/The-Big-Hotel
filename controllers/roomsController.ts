let Room = require("../models/room");

let getAllRooms = () => {
  return new Promise((resolve, reject) => {
    Room.find((err, rooms) => {
      err ? reject(err) : resolve(rooms);
    });
  });
};

let insertRoom = (isVip:boolean, haveBath:boolean, roomNumber:number) => {
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

let getOneRoom = (_id:string) => {
  return new Promise((resolve, reject) => {
    Room.findOne({ _id }, (err, room) => {
      err ? reject(err) : resolve(room);
    });
  });
};

let updateOneRoom = (_id:string, newRoom:object) => {
  return new Promise((resolve, reject) => {
    Room.findOneAndUpdate({ _id }, { $set: newRoom }, (err, room) => {
      err ? reject(err) : resolve(room);
    });
  });
};

let deleteOneRoom = (_id:string) => {
  return new Promise((resolve, reject) => {
    Room.findByIdAndDelete({ _id }, (err, room) => {
      err ? reject(err) : resolve(room);
    });
  });
};

let roomsWithBath = () => {
  return new Promise((resolve, reject) => {
    Room.find({ haveBath: true }, (err, room) => {
      err ? reject(err) : resolve(room);
    });
  });
};

let roomsWithBathAndVip = () => {
  return new Promise((resolve, reject) => {
    Room.find({ $or: [{ haveBath: true }, { isVip: true }] }, (err, room) => {
      err ? reject(err) : resolve(room);
    });
  });
};

export {
  getAllRooms,
  insertRoom,
  getOneRoom,
  updateOneRoom,
  deleteOneRoom,
  roomsWithBath,
  roomsWithBathAndVip,
};
