let express = require("express");
const router = express.Router();
let {
  getAllRooms,
  insertRoom,
  getOneRoom,
  updateOneRoom,
  deleteOneRoom,
} = require("../controllers/roomsController");

router.get("/", (req, res) => {
  getAllRooms()
    .then((rooms) => res.json(rooms))
    .catch((err) => res.json(err));
});

router.post("/", (req, res) => {
  let { isVip, haveBath, roomNumber } = req.body;
  insertRoom(isVip, haveBath, roomNumber)
    .then((room) => res.json(room))
    .catch((err) => res.json(err));
});

router.get("/:roomId", (req, res) => {
  getOneRoom(req.params.roomId)
    .then((room) => res.json(room))
    .catch((err) => console.log(err));
});

router.put("/:roomId", (req, res) => {
  updateOneRoom(req.params.roomId, req.body)
    .then((room) => res.json(room))
    .catch((err) => console.log(err));
});

router.delete("/:roomId", (req, res) => {
  deleteOneRoom(req.params.roomId)
    .then((room) => res.json(room))
    .catch((err) => console.log(err));
});

module.exports = router;
