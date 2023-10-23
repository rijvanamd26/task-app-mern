const express = require('express')
const cors = require('cors') 
const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();
const app = express()
app.use(cors({
  origin: ['http://localhost:3000']
}))
app.use(express.json())
const PORT = process.env.PORT || 5000

const taskSchema = new mongoose.Schema({
  text: String,
  completed: Boolean
},{
    timestamps : true
});

const Task = mongoose.model('Task', taskSchema);

app.get('/', async (req, res) => {
  const tasks = await Task.find({});
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  const { text } = req.body;
  const task = new Task({ text, completed: false });
  await task.save();
  res.json(task);
});

app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  task.completed = !task.completed;
  await task.save();
  res.json(task);
});


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT,()=>console.log("server is running"))
})
.catch(err => console.log(err))
