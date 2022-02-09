let express = require("express");
const router = express.Router();
let {
  getAllReservations,
  insertReservation,
  getOneReservation,
  updateOneReservation,
  deleteOneReservation,
  roomsCapacity,
} = require("../controllers/reservationsController");

router.get("/", (req, res) => {
  getAllReservations()
    .then((reservation) => res.json(reservation))
    .catch((err) => res.json(err));
});

router.get("/reservation/capacity", (req, res) => {
  roomsCapacity()
    .then((reservation) => res.send(reservation))
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
  let { room_id, capacity } = req.body;
  insertReservation(room_id, capacity)
    .then((reservation) => res.json(reservation))
    .catch((err) => res.json(err));
});

router.get("/:reservationId", (req, res) => {
  getOneReservation(req.params.reservationId)
    .then((reservation) => res.json(reservation))
    .catch((err) => console.log(err));
});

router.put("/:reservationId", (req, res) => {
  updateOneReservation(req.params.reservationId, req.body)
    .then((reservation) => res.json(reservation))
    .catch((err) => console.log(err));
});

router.delete("/:reservationId", (req, res) => {
  deleteOneReservation(req.params.reservationId)
    .then((reservation) => res.send(reservation))
    .catch((err) => console.log(err));
});

module.exports = router;
