class Storage {

constructor(){

if(Storage.instance){
return Storage.instance;
}

this.tasks = [];
this.subjects = [];
this.users = [];

this.taskId = 1;
this.subjectId = 1;
this.userId = 1;

Storage.instance = this;

}

}

module.exports = new Storage();