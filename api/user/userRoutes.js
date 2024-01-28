
const express = require('express')
// const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getUser, getUsers, deleteUser, updateUser} = require('./userController')
const router = express.Router()


router.get('/', getUsers)
router.get('/:userId', getUser)
router.put('/:userId',  updateUser)
router.put('/:id',  /* requireAuth, */ updateUser)
router.delete('/:userId',  /* requireAuth, requireAdmin, */ deleteUser)

module.exports = router




// const express = require("express");

// // userRoutes is an instance of the express router.
// // We use it to define our routes.
// // The router will be added as a middleware and will take control of requests starting with path /user.
// const userRoutes = express.Router();

// // This will help us connect to the database
// const dbo = require("../../db/conn");

// // This help convert the id from string to ObjectId for the _id.
// const ObjectId = require("mongodb").ObjectId;

// // This section will help you get a list of all the users.
// userRoutes.route("/user").get(async (req, response) => {
//   let db_connect = dbo.getDb();

//   db_connect
//     .collection("users")
//     .find({})
//     .toArray()
//     .then((data) => {
//       console.log(data);
//       response.json(data);
//     });
// });
// // This section will help you get a single user by id
// userRoutes.route("/user/:id").get((req, res) => {
//   let db_connect = dbo.getDb();
//   let myquery = { _id: new ObjectId(req.params.id) };
//   db_connect
//     .collection("users")
//     .findOne(myquery)
//     .then((data) => {
//       console.log(data);
//       res.json(data);
//     });
// });

// // This section will help you create a new user.
// userRoutes.route("/user/add").post(async (req, response) => {
//   let db_connect = dbo.getDb();
//   let myobj = {
//     fullname: req.body.fullname || "testtest",
//     isAdmin: req.body.isAdmin || "false",
//     username: req.body.username || "test",
//     password: req.body.password || "a123456z",
//   };
//   db_connect
//     .collection("users")
//     .insertOne(myobj)
//     .then((data) => {
//       console.log(data);
//       response.json(data);
//     });
// });

// // This section will help you update a user by id.
// userRoutes.route("/user/:id").put(async (req, response) => {
//   let db_connect = dbo.getDb();
//   let myquery = { _id: new ObjectId(req.params.id) };
//   const userToSave = {
//     $set: {
//       _id: new ObjectId(req.body._id),
//       username: req.body.fullname,
//       fullname: req.body.fullname,
//       password: req.body.password,
//       isAdmin: req.body.isAdmin,
//     },
//   };
//   db_connect
//     .collection("users")
//     .updateOne(myquery, userToSave).then((data, err)=>{

//       if (err) throw err;
//       console.log("1 document updated");
//       response.json(data);
//     });
//   })

// // This section will help you delete a user
// userRoutes.route("/:id").delete((req, response) => {
//   let db_connect = dbo.getDb();
//   let myquery = { _id: ObjectId(req.params.id) };
//   db_connect.collection("users").deleteOne(myquery, function (err, obj) {
//     if (err) throw err;
//     console.log("1 document deleted");
//     response.json(obj);
//   });
// });

// module.exports = userRoutes;



