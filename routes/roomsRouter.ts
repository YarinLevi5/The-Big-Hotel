import Express from 'express'
const router = Express.Router();
let {
  getAllRooms,
  insertRoom,
  getOneRoom,
  updateOneRoom,
  deleteOneRoom,
  roomsWithBath,
  roomsWithBathAndVip,
} = require("../controllers/roomsController");

router.get("/", (req:Express.Request, res:Express.Response) => {
  getAllRooms()
    .then((rooms) => res.json(rooms))
    .catch((err) => res.json(err));
});

router.get("/find/bath", (req:Express.Request, res:Express.Response) => {
  roomsWithBath()
    .then((rooms) => res.json(rooms))
    .catch((err) => res.json(err));
});

router.get("/find/bathOrVip", (req:Express.Request, res:Express.Response) => {
  roomsWithBathAndVip()
    .then((rooms) => res.json(rooms))
    .catch((err) => res.json(err));
});

router.post("/", (req:Express.Request, res:Express.Response) => {
  let { isVip, haveBath, roomNumber } = req.body;
  insertRoom(isVip, haveBath, roomNumber)
    .then((room) => res.json(room))
    .catch((err) => res.status(400).json(err));
});

router.get("/:roomId", (req:Express.Request, res:Express.Response) => {
  getOneRoom(req.params.roomId)
    .then((room) => res.json(room))
    .catch((err) => res.json(err));
});

router.put("/:roomId", (req:Express.Request, res:Express.Response) => {
  updateOneRoom(req.params.roomId, req.body)
    .then((room) => res.json(room))
    .catch((err) => res.json(err));
});

router.delete("/:roomId", (req:Express.Request, res:Express.Response) => {
  deleteOneRoom(req.params.roomId)
    .then((room) => res.json(room))
    .catch((err) => res.json(err));
});

module.exports = router;
