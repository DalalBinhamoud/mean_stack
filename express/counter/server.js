const express = require("express");
const app = express();


app.listen(8000, () => console.log("listening on port 8000"));
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
}))

app.get('/', (req, res) => {
    var data = req.session.count
    res.render('counter', {data: data});
});


app.get('/reload', (req, res) => {

    if (req.session.count != null){
    req.session.count += 2;  
    }else{
        req.session.count= 1;
   }
    res.redirect('/');
});

app.get('/reset', (req, res) => {
        req.session.count= 1;

    res.redirect('/');
});