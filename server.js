const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// TEST
app.get("/", (req, res) => {
  res.send("StudyMate API radi!");
});


let tasks = [];
let id = 1;

app.get("/tasks", (req, res) => {
  res.send(tasks);
});

app.post("/tasks", (req, res) => {
  const task = {
    id: id++,
    title: req.body.title,
    due_date: req.body.due_date,
    subject_id: req.body.subject_id,
    user_id: req.body.user_id, 
    done: false
  };

  tasks.push(task);
  res.send(task);
});


let subjects = [];
let subjectId = 1;

app.get("/subjects", (req, res) => {
  res.send(subjects);
});

app.post("/subjects", (req, res) => {
  const subject = {
    id: subjectId++,
    name: req.body.name
  };

  subjects.push(subject);
  res.send(subject);
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== taskId);
  res.send("Deleted");
});


app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (task) {
    task.done = !task.done;
    res.send(task);
  } else {
    res.status(404).send("Not found");
  }
});
let users = [];
let userId = 1;


app.post("/login", (req, res) => {
  const { name, email, password } = req.body;

  let user = users.find(u => u.email === email);

  if (!user) {
    
    user = {
      id: userId++,
      name,
      email,
      password
    };
    users.push(user);
  }

  res.send(user);
});
app.get("/users", (req, res) => {
  res.send(users);
});