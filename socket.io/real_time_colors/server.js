const express = require('express');
const app = express();


const server =  app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.static(__dirname + "/static"));


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({extended: true}));

const io = require('socket.io')(server);
var currentColor = "";
  
io.on('connection', function (socket) { 
  
  socket.on('clicked_color', function (data) { 
    if(data =="green"){
      currentColor = "#32a852"
    }else if (data =="blue"){
      currentColor = "#3267a8"
    }else{
      currentColor = "#d9b2d2"
    }
    io.emit("set_background",currentColor)
  });

  socket.on('initial_color', function () { 
    socket.emit("set_background",currentColor)
  }); 

 
});


app.get("/", (req,res) => {
  res.render("index");
});
