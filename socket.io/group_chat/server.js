const express = require('express');
const app = express();


const server =  app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.static(__dirname + "/static"));


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({extended: true}));

const io = require('socket.io')(server);
var users = [];  
var current_user = "" 

io.on('connection', function (socket) { 
  
  socket.on('got_new_user', function (data) { 
    socket.username = data.name
    socket.emit("new_user",{name:data.name})
    // io.emit("existing_users", users)
  });

  socket.on('chat_group', function(data) {
    users.push({name:current_user,msg:data.msg})
    io.emit('chat_group', '<span>' + socket.username + '</span>: ' + data.msg);
});


    
});

app.get("/", (req,res) => {
  res.render("index");
});
