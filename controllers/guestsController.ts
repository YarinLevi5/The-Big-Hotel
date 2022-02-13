let Guest = require("../models/guest");
import axios from 'axios'

let getAllGuests = () => {
  return new Promise((resolve, reject) => {
    Guest.find((err, guests) => {
      err ? reject(err) : resolve(guests);
    });
  });
};

let insertGuest = (name:string, gender:string, dateOfBirth:string, isVip:boolean) => {
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

let getOneGuest = (_id:string) => {
  return new Promise((resolve, reject) => {
    Guest.findOne({ _id }, (err, guest) => {
      err ? reject(err) : resolve(guest);
    });
  });
};

let updateOneGuest = (_id:string, newGuest:object) => {
  return new Promise((resolve, reject) => {
    Guest.findOneAndUpdate({ _id }, { $set: newGuest }, (err, guest) => {
      err ? reject(err) : resolve(guest);
    });
  });
};

let deleteOneGuest = (_id:string) => {
  return new Promise((resolve, reject) => {
    Guest.findByIdAndDelete({ _id }, (err, guest) => {
      err ? reject(err) : resolve(guest);
    });
  });
};

let femaleGuests = () => {
  return new Promise((resolve, reject) => {
    Guest.find({ gender: "female" }, (err, guest) => {
      err ? reject(err) : resolve(guest);
    });
  });
};

let showAllGuests=()=>{
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:4000/guests',{timeout:5000})
        .then(guest=>resolve(guest))
        .catch(err=>reject(err))
  });
}

export {
  getAllGuests,
  insertGuest,
  getOneGuest,
  updateOneGuest,
  deleteOneGuest,
  femaleGuests,
  showAllGuests
};
