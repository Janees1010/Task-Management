const express = require("express")
const router  = express.Router();
const authenticateUser = require("../middleware/Authentication")
const {
  addTask,
  fetchTasks,
  findOneTask,
  handleTaskDelete,
  handleTaskEdit,
  handleSearch,
  getTasksByStatus
 
} = require("../controller/taskController")

router.post("/add",addTask)
router.get("/",authenticateUser,fetchTasks)
router.get("/findOne",authenticateUser,findOneTask)
router.post("/edit",authenticateUser,handleTaskEdit)
router.get("/delete",authenticateUser,handleTaskDelete)
router.get("/search",authenticateUser,handleSearch)
router.get("/status",authenticateUser,getTasksByStatus)
// router.get("/progress",authenticateUser,getProgressTasks)


module.exports = router;       