const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoose_dashboard', {useNewUrlParser: true});
const server =  app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({extended: true}));



// models
const animalSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2},
  food: { type: String, required: true, minlength: 2}
 },{timestamps: true })
 // create an object to that contains methods for mongoose to interface with MongoDB
 const Animal = mongoose.model('Animal', animalSchema);
 



app.get("/", (req,res) => {
  Animal.find() 
  .then(data => res.render("index", {mongoose: data}))
  .catch(err => res.json(err));
});

app.get("/mongooses/:id", (req,res) => {
  Animal.find({_id: req.params.id})
  .then(data => res.render("information", {animal_info: data}))
  .catch(err => res.json(err));
});

app.get('/new', (req,res) => {
   res.render("add_animal")
});

app.post('/mongooses', (req, res) => {
  const animal = new Animal();
    animal.name = req.body.name;
    animal.food = req.body.food;
  animal.save()
    .then(newAnimalData => console.log('animal created: ', newAnimalData))
    .catch(err => {
  console.log(err);
});  
  res.redirect('/');
});


app.get("/edit/:id", (req,res) => {
  Animal.find({_id: req.params.id})
  .then(data => {
    console.log("data info");
    console.log(data[0].name);
    res.render("edit_animal", {animal_info: data})
  })
  .catch(err => res.json(err));
});

app.post("/mongoose/:id", (req,res) => {
  Animal.updateOne({_id:req.params.id}, {
    name: req.body.name, food: req.body.food 
})
    .then(result => {
        // logic with result -- note this will be the original object by default!
    })
    .catch(err => res.json(err));
    res.redirect('/');
});

app.post("/destroy/:id", (req,res) => {
  Animal.remove({_id: req.params.id})
    .then(deletedAnimal => {
      console.log('animal deleted:')
    })
    .catch(err => res.json(err));
    res.redirect('/');
});
