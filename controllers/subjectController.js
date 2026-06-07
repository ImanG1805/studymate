const storage = require("../patterns/StorageSingleton");


exports.getSubjects = (req,res)=>{

res.send(storage.subjects);

};


exports.createSubject=(req,res)=>{

const subject = {

id:storage.subjectId++,
name:req.body.name

};


storage.subjects.push(subject);

res.send(subject);

};