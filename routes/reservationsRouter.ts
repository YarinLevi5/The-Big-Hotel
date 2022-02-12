import Express from 'express'
const router = Express.Router();
let {
  getAllReservations,
  insertReservation,
  getOneReservation,
  updateOneReservation,
  deleteOneReservation,
  roomsCapacity,
} = require("../controllers/reservationsController");

router.get("/", (req:Express.Request, res:Express.Response) => {
  getAllReservations()
    .then((reservation) => res.json(reservation))
    .catch((err) => res.json(err));
});

router.get("/reservation/capacity", (req:Express.Request, res:Express.Response) => {
  roomsCapacity()
    .then((reservation) => res.send(reservation))
    .catch((err) =>  res.json(err));
});

router.post("/", (req:Express.Request, res:Express.Response) => {
  let { room_id, capacity } = req.body;
  insertReservation(room_id, capacity)
    .then((reservation) => res.json(reservation))
    .catch((err) =>  res.status(400).json(err));
});

router.get("/:reservationId", (req:Express.Request, res:Express.Response) => {
  getOneReservation(req.params.reservationId)
    .then((reservation) => res.json(reservation))
    .catch((err) =>  res.json(err));
});

router.put("/:reservationId", (req:Express.Request, res:Express.Response) => {
  updateOneReservation(req.params.reservationId, req.body)
    .then((reservation) => res.json(reservation))
    .catch((err) =>  res.json(err));
});

router.delete("/:reservationId", (req:Express.Request, res:Express.Response) => {
  deleteOneReservation(req.params.reservationId)
    .then((reservation) => res.send(reservation))
    .catch((err) =>  res.json(err));
});

module.exports = router;
