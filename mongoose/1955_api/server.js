const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/old_users', {useNewUrlParser: true});
const server =  app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({extended: true}));


// models
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2}
 },{timestamps: true })
 // create an object to that contains methods for mongoose to interface with MongoDB
 const User = mongoose.model('User', userSchema);
 

app.get("/", (req,res) => {
  User.find() 
  .then(data => res.json(data))
  .catch(err => res.json(err));
});

app.get('/new/:name', (req, res) => {
  const user = new User();
    user.name = req.params.name;
  user.save()
    .then(newUserData => console.log('user created: ', newUserData))
    .catch(err => {
  console.log(err);
});  
  res.redirect('/');
});

app.get("/:name", (req,res) => {
  User.find({name: req.params.name})
  .then(data => res.json(data))
  .catch(err => res.json(err));
});

app.get("/remove/:name", (req,res) => {
  User.remove({name: req.params.name})
    .then(deletedAnimal => {
      console.log('user deleted:')
    })
    .catch(err => res.json(err));
    res.redirect('/');
});
