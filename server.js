const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const taskController = require("./controllers/taskController");
const subjectController = require("./controllers/subjectController");
const userController = require("./controllers/userController");

const app = express();

app.use(cors());
app.use(bodyParser.json());


// TEST ROUTE
app.get("/", (req,res)=>{
    res.send("StudyMate API radi!");
});


// TASK ROUTES

app.get("/tasks", taskController.getTasks);

app.post("/tasks", taskController.createTask);

app.delete("/tasks/:id", taskController.deleteTask);

app.put("/tasks/:id", taskController.updateTask);


// SUBJECT ROUTES

app.get("/subjects", subjectController.getSubjects);

app.post("/subjects", subjectController.createSubject);


// USER ROUTES

app.post("/login", userController.login);

app.get("/users", userController.getUsers);



// START SERVER

app.listen(3000, ()=>{

console.log("Server running on port 3000");

});