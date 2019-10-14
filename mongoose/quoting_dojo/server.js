const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quoting_dojo', {useNewUrlParser: true});

const server =  app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({extended: true}));
const session = require('express-session');
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
const flash = require('express-flash');
app.use(flash());


// models
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 10},
  quote:{ type: String, required: true, minlength: 6}
 },{timestamps: true })
 // create an object to that contains methods for mongoose to interface with MongoDB
 const User = mongoose.model('User', UserSchema);
 



app.get("/", (req,res) => {
res.render("index")
});

app.get("/quotes", (req,res) => {
  User.find() //{ sort :{ createdAt : -1}}
  .then(data => res.render("quotes", {quotes: data}))
  .catch(err => res.json(err));
});


app.post('/quotes', (req, res) => {
  const user = new User();
  user.name = req.body.name;
  user.quote = req.body.quote;
  user.save()
    .then(newUserData => console.log('user created: ', newUserData))
    .catch(err => {
  console.log(err);
  for (var key in err.errors) {
    req.flash('add_quote', err.errors[key].message);
}
});  
  res.redirect('/');
});
