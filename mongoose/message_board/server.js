const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/message_board', {useNewUrlParser: true});
const server =  app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({extended: true}));



// models

const commentSchema = new mongoose.Schema({
  name: {type: String, required: [true, "your name is required"]},
  content: {type: String, required: [true, "comment must have content"]},
}, {timestamps: true})

const messageSchema = new mongoose.Schema({
  name: {type: String, required: [true, "your name is required"]},
  content: {type: String, required: [true, "message must have content"], minlength: [3, "message content must have at least 3 characters"]},
  comments: [commentSchema]
}, {timestamps: true})

 // create an object to that contains methods for mongoose to interface with MongoDB
 const Message = mongoose.model('Message', messageSchema);
 const Comment = mongoose.model('Comment', commentSchema);
 


app.get("/", (req,res) => {
   Message.find() 
  .then(data => res.render("index", {messages: data}))
  .catch(err => res.json(err));
});

app.post('/add_message', (req, res) => {
  const message = new Message();
    message.name = req.body.name;
    message.content = req.body.message;
    message.save()
    .then(newMessageData => console.log('message created: ', newMessageData))
    .catch(err => {
  console.log(err);
});  
  res.redirect('/');
});

app.post('/add_comment/:id', (req, res) => {

  Comment.create(req.body, function(err, data){
    if(err){
      console.log('error : ', err)
    }
    else {
         Message.findOneAndUpdate({_id: req.params.id}, {$push: {comments: data}}, function(err, data){
              if(err){
                console.log('error : ', err)
              }
              else {
                console.log('comment created: ', data)
              }
         })
        }
      })    
  res.redirect('/');
});
