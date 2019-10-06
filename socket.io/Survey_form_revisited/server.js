const express = require("express");
const app = express();


const server =  app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({extended: true}));

const io = require('socket.io')(server);


    
io.on('connection', function (socket) { //2
 
  socket.on('posting_form', function (data,) { //7
    
    socket.emit('updated_message', { msg: data , random: Math.floor(Math.random() * (1000) + 1) }); //3
  });
});

app.get('/', (req, res) => {
    res.render('index', {title: "my root route"});
});

