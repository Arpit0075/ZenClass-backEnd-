const router = require("express").Router();
const mongo = require("../mongo");
const { ObjectId } = require("mongodb");

// let mentors = [
//   { name: "dylan", email: "jujju@gma", id: 1, students: ["alu", "tam", "ron"] },
// ];

// get =>  /mentors
router.get("/", async (req, res) => {
  try {
    //const posts = await mongo.db.collection("posts").find().toArray();
    const mentors = await mongo.mentors.find().toArray();
    res.send(mentors);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//get particular mentor with id from front end
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  try {
    //const posts = await mongo.db.collection("posts").find().toArray();
    const mentor = await mongo.mentors.findOne({ _id: ObjectId(id) });
    res.send(mentor);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//creating new mentor
router.post("/", async (req, res) => {
  try {
    const newMentor = await mongo.mentors.insertOne(req.body);
    res.send({
      ...req.body, //id: newMentor.insertedId
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//assigning/updating student to mentor put req
router.put("/:id", async (req, res) => {
  // console.log(req.body, req.params.id);
  // res.send({ messagge: "assigned" });

  try {
    const assignedStudent = await mongo.mentors.findOneAndUpdate(
      { _id: ObjectId(req.params.id) },
      //pushing to students array inside the students field in mentors collection
      { $push: { students: req.body.name } }
    );
    res.send(assignedStudent);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
