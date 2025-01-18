const Task = require("../model/taskModel");

const inertTask = async (task) => {
  try {
    const newTask = await Task.create(task);
    return newTask;
  } catch (error) {
    throw new Error(`error adding tasks : ${error.message}`);
  }
};

const findTaks = async (userId) => {
  try {
    const tasks = await Task.find({ userId });
    return tasks;
  } catch (error) {
    throw new Error(`error fetching tasks : ${error.message}`);
  }
};

const findTaskById = async (id, userId) => {
  try {
    const task = await Task.findOne({ _id: id, userId });
    return task;
  } catch (error) {
    throw new Error(`error fetching tasks : ${error.message}`);
  }
};

const deleteTask = async (id) => {
  try {
    const response = await Task.findByIdAndDelete(id);
    return response;
  } catch (error) {
    throw new Error(`error deleting task : ${error.message}`);
  }
};

const updateTask = async (id, newTask) => {
  try {
    const response = await Task.findByIdAndUpdate(id, newTask, { new: true });
    return response;
  } catch (error) {
    throw new Error(`error updating tasks : ${error.message}`);
  }
};

const findTaskByCategoryOrDueDate = async (query, userId) => {
  try {
    if (query === "easy" || query === "medium" || query === "hard") {
      const response = await Task.find({
        userId,
        priority: new RegExp(query, "i"),
      });
      return response;
    }
    const response = await Task.find({
      userId,
      category: new RegExp(query, "i"),
    });
    return response;
  } catch (error) {
    throw new Error(`error fetching tasks : ${error.message}`);
  }
};

const findCompletedTasks = async (userId, status) => {
  try {
    const tasks = await Task.find({ userId, status: status });
    console.log(tasks);
    return tasks;
  } catch (error) {
    throw new Error(`error fetching completed tasks : ${error.message}`);
  }
};

const findProgressTasks = async (userId) => {
  try {
    const tasks = await Task.find({ userId, status: "progress" });
    return tasks;
  } catch (error) {
    throw new Error(`error fetching completed tasks : ${error.message}`);
  }
};

module.exports = {
  inertTask,
  findTaks,
  findTaskById,
  deleteTask,
  updateTask,
  findTaskByCategoryOrDueDate,
  findCompletedTasks,
  findProgressTasks,
};
