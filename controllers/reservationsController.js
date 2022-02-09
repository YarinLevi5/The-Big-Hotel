let Reservation = require("../models/reservation");

let getAllReservations = () => {
  return new Promise((resolve, reject) => {
    Reservation.find({}, (err, reservations) => {
      err ? reject(err) : resolve(reservations);
    });
  });
};
let insertReservation = (room_id, capacity) => {
  return new Promise((resolve, reject) => {
    let reservation = new Reservation({
      room_id,
      capacity,
    });
    reservation.save((err, reservation) => {
      err ? reject(err) : resolve(reservation);
    });
  });
};

let getOneReservation = (_id) => {
  return new Promise((resolve, reject) => {
    Reservation.findOne({ _id }, (err, reservation) => {
      err ? reject(err) : resolve(reservation);
    });
  });
};
let updateOneReservation = (_id, newReservation) => {
  return new Promise((resolve, reject) => {
    Reservation.findOneAndUpdate(
      { _id },
      { $set: newReservation },
      (err, reservation) => {
        err ? reject(err) : resolve(reservation);
      }
    );
  });
};
let deleteOneReservation = (_id) => {
  return new Promise((resolve, reject) => {
    Reservation.findByIdAndDelete({ _id }, (err, reservation) => {
      err ? reject(err) : resolve(reservation);
    });
  });
};

let roomsCapacity = () => {
  return new Promise((resolve, reject) => {
    Reservation.find({ capacity: { $gt: 3 } }, (err, reservation) => {
      err ? reject(err) : resolve(reservation);
    });
  });
};

module.exports = {
  getAllReservations,
  insertReservation,
  getOneReservation,
  updateOneReservation,
  deleteOneReservation,
  roomsCapacity,
};
