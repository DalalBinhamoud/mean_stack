const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quoting_advance', {useNewUrlParser: true});

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
 const Quote = mongoose.model('Quote', UserSchema);
 
 require('./config/routes.js')(app)