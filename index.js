const express = require("express");
const app = express();
app.use(express.json());

const students = {
  1: {
    id: 1,
    name: "John Doe",
    age: 20,
    grade: "A",
  },
  2: {
    id: 2,
    name: "Jane Smith",
    age: 22,
    grade: "B",
  },
  3: {
    id: 3,
    name: "Alice Johnson",
    age: 21,
    grade: "A-",
  },
  4: {
    id: 4,
    name: "Bob Brown",
    age: 23,
    grade: "C+",
  },
  5: {
    id: 5,
    name: "Eva White",
    age: 19,
    grade: "A",
  },
  6: {
    id: 6,
    name: "Charlie Davis",
    age: 24,
    grade: "B+",
  },
  7: {
    id: 7,
    name: "Grace Turner",
    age: 20,
    grade: "A",
  }
};

app.get("/", function (req, res) {
  res.send("Hello World");
});


app.get("/api/students", function (req, res) {
  res.send(students);
});

app.get("/api/students/:id", function (req, res) {
  const student = students[req.params.id];
  if (!student) return res.status(400).send("Student not found");
  res.send(student);
});

app.put("/api/students/:id", function (req, res) {
  const student = students[req.params.id];
  //if (!student) return res.status(400).send("Student not found");

  // Update student data
  student.name = req.body.name;
  student.age = req.body.age;
  student.grade = req.body.grade;

  res.send(student);
});

app.delete("/api/students/:id", function (req, res) {
  if (!students[req.params.id]) return res.status(400).send("Student not found");
  delete students[req.params.id];
  res.send(Object.values(students));
});

app.post("/api/students", function (req, res) {
  // Generate a unique ID for the new student
  const newStudentId = Object.keys(students).length + 1;

  // Create a new student object
  const newStudent = {
    id: newStudentId,
    name: req.body.name,
    age: req.body.age,
    grade: req.body.grade,
  };

  // Add the new student to the students object
  students[newStudentId] = newStudent;

  res.send(newStudent);
});

app.listen(3000);
