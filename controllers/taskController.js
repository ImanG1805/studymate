const storage = require("../patterns/StorageSingleton");
const TaskFactory = require("../patterns/TaskFactory");


exports.getTasks = (req,res)=>{

res.send(storage.tasks);

};


exports.createTask = (req,res)=>{

const task = TaskFactory.createTask(
storage.taskId++,
req.body.title,
req.body.due_date,
req.body.subject_id,
req.body.user_id
);

storage.tasks.push(task);

res.send(task);

};


exports.deleteTask = (req,res)=>{

storage.tasks =
storage.tasks.filter(
t => t.id !== parseInt(req.params.id)
);

res.send("Deleted");

};



exports.updateTask = (req,res)=>{

const task =
storage.tasks.find(
t => t.id === parseInt(req.params.id)
);


if(task){

task.done = !task.done;

res.send(task);

}

else{

res.status(404).send("Not found");

}

};