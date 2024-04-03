const Task = require("../models/task")

const {  BadRequestError,CustomAPIError,NotFoundError} = require("../errors/index");

exports.getAllTasks = async(req,res,next)=>{
  try {
      const tasks = await Task.find({});
      if (tasks.length==0) {
        throw new NotFoundError("There are no tasks found")
      }

      res.status(200).json({
        tasks : tasks
      })
    
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode=500
    }
    next(error)
  }
}

exports.createTask = async(req,res,next)=>{
  try {
      const newTask = new Task({
        name: req.body.name
      });
      await newTask.save()
      console.log("Task added successfully");
      res.status(200).send(newTask)
  } catch (error) {
    next(error)
  }
}

exports.deleteTask = async(req,res,next)=>{
  try {
    const id =req.params.id
    await Task.deleteOne({_id: id})
   
    console.log("Task deleted successfully");
    res.status(200).send({
      message: "Task deleted successfully"
    })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode=500
    }
    next(error)
  }
}
exports.getTask = async(req,res,next)=>{
  try {
    const id =req.params.id
    const task = await Task.findById(id)
   
    if (!task) {
      throw new NotFoundError(`Task with _id = ${id} Not found`)
    }
    console.log("Task Found");
    res.status(200).send({
      task: task
    })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode=500
    }
    next(error)
  }
}
exports.updateTask = async(req,res,next)=>{
  try {
    const id =req.params.id
    const task = await Task.findById(id)
   
    if (!task) {
      throw new NotFoundError(`Task with _id = ${id} Not found`)
    }

    task.name= req.body.name;
    task.completed= req.body.completed;

    console.log(task);

    await task.save()
    console.log("Task Updated");
    res.status(200).send({
      task: task
    })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode=500
    }
    next(error)
  }
}
