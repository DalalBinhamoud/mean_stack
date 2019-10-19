const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tasks', {useNewUrlParser: true});
const server =  app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({extended: true}));


// models
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 2},
  description: { type: String, required: true, minlength: 5},
  completed: { type: Boolean, required: true, minlength: 2}
 },{timestamps: true })
 // create an object to that contains methods for mongoose to interface with MongoDB
const Task = mongoose.model('Task', taskSchema);

 
app.get("/tasks", (req,res) => {
  Task.find() 
  .then(data => res.json(data))
  .catch(err => res.json(err));
});


app.get("/tasks/:id", (req,res) => {
  Task.find({_id: req.params.id}) 
  .then(data => res.json(data))
  .catch(err => res.json(err));
});



app.post('/tasks', (req, res) => {
  var task = new Task(req.body)
  task.save(function (err, task) {
      if (err) {
          console.log("error", err);
          res.json(err);

      } else {
          res.json(task)
      }
  })
})

app.put("/tasks/:id", (req,res) => {

  Task.updateOne(function (err, task) {
    if (err) {
        console.log("error", err);
        res.json(err);

    } else {
        res.json(task)
    }
})
});


app.delete("/tasks/:id", (req,res) => {
  Task.remove({name: req.params.id})
    .then(deletedTask => {
      console.log('task deleted:',deletedTask)
      res.json({msg:"successfuly deleted"})
    })
    .catch(err => res.json(err));
});
