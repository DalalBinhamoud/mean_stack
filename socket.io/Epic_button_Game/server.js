const express = require("express");
const app = express();


const server =  app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({extended: true}));

const io = require('socket.io')(server);
var dataSession = 0

const session = require('express-session');
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))



io.on('connection', function (socket) { //2
 
  
  socket.on('shared_counter', function (data) { //7
    dataSession = dataSession + 1
    socket.emit('shared_counter',  dataSession); //3
  });

  socket.on('reset', function (data) { //7
    dataSession = 0
    socket.emit('reset',  dataSession); //3
  });
});

app.get('/', (req, res) => {

    res.render('index');
});

