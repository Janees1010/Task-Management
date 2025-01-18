
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  
  description: {            
    type:String,
    required: true,
  },

  priority: {
    type: String,
    required:true
},
category:{
    type:String,
    required:true
},
status:{
    type:String,
    default:"pending"
},
userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
},
dueDate:{
    type:Date,
    required:true
}
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

