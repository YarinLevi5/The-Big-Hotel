let express = require("express");
const router = express.Router();
let {
  getAllGuests,
  insertGuest,
  getOneGuest,
  updateOneGuest,
  deleteOneGuest,
} = require("../controllers/guestsController");

router.get("/", (req, res) => {
  getAllGuests()
    .then((guests) => res.json(guests))
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
  let { name, gender, dateOfBirth, isVip } = req.body;
  insertGuest(name, gender, dateOfBirth, isVip)
    .then((guest) => res.json(guest))
    .catch((err) => console.log(err));
});

router.get("/:guestId", (req, res) => {
  getOneGuest(req.params.guestId)
    .then((guest) => res.json(guest))
    .catch((err) => console.log(err));
});

router.put("/:guestId", (req, res) => {
  updateOneGuest(req.params.guestId, req.body)
    .then((guest) => res.json(guest))
    .catch((err) => console.log(err));
});

router.delete("/:guestId", (req, res) => {
  deleteOneGuest(req.params.guestId)
    .then((guest) => res.json(guest))
    .catch((err) => console.log(err));
});

module.exports = router;
