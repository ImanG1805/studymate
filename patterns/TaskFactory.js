class TaskFactory {

static createTask(id, title, due_date, subject_id, user_id){

return {

id:id,
title:title,
due_date:due_date,
subject_id:subject_id,
user_id:user_id,
done:false

};

}

}

module.exports = TaskFactory;
