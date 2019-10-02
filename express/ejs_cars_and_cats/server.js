const express = require("express");
const app = express();
app.get('/', (request, response) => {
   response.send("Hello Express");

});
app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get("/cars", (req, res) => {
   res.render('cars');
})

app.get("/cats", (req, res) => {
   res.render('cats');
})

app.get("/cars/new", (req, res) => {
   res.render('form');
})