const router = require("express").Router();
const mongo = require("../mongo");
const { ObjectId } = require("mongodb");

// let students = [
//   { name: "alu", email: "alu@gma", mentor: "dylan", id: 1 },
//   { name: "tam", email: "alu@gma", mentor: "dylan", id: 2 },
//   { name: "ron", email: "alu@gma", mentor: "dylan", id: 3 },
//   { name: "subbu", email: "alu@gma", mentor: "ankit", id: 4 },
//   { name: "ash", email: "alu@gma", mentor: "", id: 5 },
// ];

// get =>  /students
router.get("/", async (req, res) => {
  try {
    const students = await mongo.students.find().toArray();
    res.send(students);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  //console.log(id);
  try {
    const student = await mongo.students.findOne({ _id: ObjectId(id) });
    res.send(student);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  try {
    const newStudent = await mongo.students.insertOne(req.body);
    res.send({ ...req.body, id: newStudent.insertedId });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//assigning mentor to student
router.put("/:id", async (req, res) => {
  try {
    // const updatedPost = await mongo.db.collection("posts")
    //console.log(req.params.id);
    //console.log(req.body);
    const mentor = await mongo.students.findOneAndUpdate(
      { _id: ObjectId(req.params.id) },
      { $set: { mentor: req.body.name } }
    );
    res.send(mentor);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
