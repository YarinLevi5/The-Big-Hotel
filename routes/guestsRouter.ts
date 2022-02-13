import Express from 'express'
import axios from 'axios'
const router = Express.Router();
let {
  getAllGuests,
  insertGuest,
  getOneGuest,
  updateOneGuest,
  deleteOneGuest,
  femaleGuests,
} =require ('../controllers/guestsController')

router.get("/", (req:Express.Request, res:Express.Response) => {
  getAllGuests()
    .then((guests:string) => res.json(guests))
    .catch((err:string) =>  res.json(err));
});

router.get("/find/femaleGuests", (req:Express.Request, res:Express.Response) => {
  femaleGuests()
    .then((guests:string) => res.json(guests))
    .catch((err:string) => res.json(err));
});

router.get('/showMeAll',(req:Express.Request, res:Express.Response)=>{
  axios.get('http://localhost:4000/guests',{timeout:5000})
  .then(guestsData=>res.json(guestsData.data))
   .catch(err=>res.json(err))
})

router.post("/", (req:Express.Request, res:Express.Response) => {
  let { name, gender, dateOfBirth, isVip } = req.body;
  insertGuest(name, gender, dateOfBirth, isVip)
    .then((guest:string) => res.json(guest))
    .catch((err:string) => res.status(400).json(err));
});

router.get("/:guestId", (req:Express.Request, res:Express.Response) => {
  getOneGuest(req.params.guestId)
    .then((guest:string) => res.json(guest))
    .catch((err:string) =>  res.json(err));
});

router.put("/:guestId", (req:Express.Request, res:Express.Response) => {
  updateOneGuest(req.params.guestId, req.body)
    .then((guest:string) => res.json(guest))
    .catch((err:string) =>  res.json(err));
});

router.delete("/:guestId", (req:Express.Request, res:Express.Response) => {
  deleteOneGuest(req.params.guestId)
    .then((guest:string) => res.json(guest))
    .catch((err:string) =>  res.json(err));
});

module.exports = router;
