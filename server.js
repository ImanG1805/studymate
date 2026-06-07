const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const taskController = require("./controllers/taskController");
const subjectController = require("./controllers/subjectController");
const userController = require("./controllers/userController");

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.get("/", (req,res)=>{
    res.send("StudyMate API radi!");
});




app.get("/tasks", taskController.getTasks);

app.post("/tasks", taskController.createTask);

app.delete("/tasks/:id", taskController.deleteTask);

app.put("/tasks/:id", taskController.updateTask);



app.get("/subjects", subjectController.getSubjects);

app.post("/subjects", subjectController.createSubject);



app.post("/login", userController.login);

app.get("/users", userController.getUsers);




const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{

console.log("Server running on port " + PORT);

});

