const storage = require("../patterns/StorageSingleton");


exports.login=(req,res)=>{

const {name,email,password}=req.body;


let user =
storage.users.find(
u=>u.email===email
);


if(!user){

user={

id:storage.userId++,
name,
email,
password

};


storage.users.push(user);

}


res.send(user);

};


exports.getUsers=(req,res)=>{

res.send(storage.users);

};