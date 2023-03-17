const Task = require('../models/tasks');

const create = async (req, res) => { // Create and save a new blog
  try {
    const {  title ,completed} = req.body;
    const {username} = req
    let taskModel = new Task({ username, title, completed,createdAt:new Date() });
    const response = await taskModel.save();
    res.json({ message: 'New Task Added Successfully' });

  } catch (error) {
    console.log("Error", error.message)
    res.json({ message: error.message });
  }
}

const findAll = async (req, res) => {
  const { username } = req.body;
  try {
    const response = await Task.find({ username })
    res.json({ data: response });
  }
  catch (error) {
    console.log("Error", error.message)
    res.json({ message: error.message });
  }
}
const findAllAdmin = async (req, res) => {
  try {
    const response = await Task.find({})
    res.json({ data: response });
  }
  catch (error) {
    console.log("Error", error.message)
    res.json({ message: error.message });
  }
}
findAllAdmin
const deleteOne = async (req, res) => {
  try {
    const {id} = req.body;
    const response = await Task.deleteOne({_id:id})
    res.json({ message: 'Task Deleted Successfully' });

  }
  catch (error) {
    console.log("Error", error.message)
    res.json({ message: error.message });
  }
}

const updateMany = async (req, res) => {
  const { id, title, completed } = req.body;
  try {
    response = await Task.updateOne({ _id: id }, { $set: {title, completed }})
    res.json({ message: 'Task Updated Successfully' });

  }
  catch (error) {
    console.log("Error", error.message)
    res.json({ message: error.message });
  }
}

const updateTaskCompleted = async (req, res) => {
  const { id } = req.body;
  try {
    response = await Task.updateOne({ _id: id }, { $set: { completed:true }})
    res.json({ message: 'Task Marked Completed Successfully' });
  }
  catch (error) {
    console.log("Error", error.message)
    res.json({ message: error.message });
  }
}
exports.create = create;
exports.findAll = findAll;
exports.updateTaskCompleted=updateTaskCompleted;
exports.updateMany = updateMany;
exports.deleteOne = deleteOne;
exports.findAllAdmin=findAllAdmin;
