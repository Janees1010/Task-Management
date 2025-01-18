const  {
    inertTask,
    findTaks,
    findTaskById,
    deleteTask,
    updateTask,
    findTaskByCategoryOrDueDate,
    findCompletedTasks,
    findProgressTasks
} = require("../services/taskService")

const addTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, category } = req.body;
    if ((!title, !category, !description, !priority, !dueDate))
      return res.status(400).json("missing credentails for adding task");
      const task = await inertTask(req.body)
      return res.status(200).json({newTask:task,message:"task created successfully"})
  } catch (error) {
    return res.status(500).json(error.message)
  }                      
};

const fetchTasks = async(req,res)=>{
    try {
        //   const {userId} = req.query;
        //   if(!userId) return res.status(400).json("userId needed to create task")
          const tasks =  await findTaks(req.user)
          return res.status(200).json(tasks)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const findOneTask = async(req,res) =>{
    try {
        const {id} = req.query
        if(!id)  return res.status(400).json("id needed to findOne task")
        const task = await findTaskById(id,req.user)
        return res.status(200).json(task)
    } catch (error) {
        return res.status(500).json(error.message)

    }
}

const handleTaskDelete = async(req,res)=> {
    try {
        const {id} = req.query;
        if(!id) return res.status(400).json("id is required to delete the task")
            const response = await deleteTask(id)
        return res.status(200).json("task deleted successfully")
    } catch (error) {
        return res.status(500).json(error.message)
    }
}
                     
const handleTaskEdit = async (req,res) =>{   
    try {
        const {task,id} =  req.body;
        if(!id || !task) return res.status(400).json("id and newtask is required to update the task")
        const response = await updateTask(id,task)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const handleSearch = async(req,res)=>{
     try {
        const {query} = req.query;
        if(!query) return res.status(400).json("query required to search")
        const tasks = await findTaskByCategoryOrDueDate(query,req.user)
        return res.status(200).json(tasks)
     } catch (error) {
        return res.status(500).json(error.message)
     }
}

const getTasksByStatus = async(req,res)=>{
    try {
        console.log(req.user,"reached");
        const {status} = req.query;
        if(!status) return res.status("status required")
        const tasks =  await findCompletedTasks(req.user,status)
        return res.status(200).json(tasks)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

// const getProgressTasks = async(req,res)=>{
//     try {
//         const tasks = await findProgressTasks(req.user)
//         return res.status(200).json(tasks)
//     } catch (error) {
//         return res.status(500).json(error.message)
//     }
// }
  
module.exports = {
  addTask,                  
  fetchTasks,
  findOneTask,
  handleTaskDelete,
  handleTaskEdit,
  handleSearch,
  getTasksByStatus,
};  
