const express = require("express");
const app = express();
app.get('/', (request, response) => {
   response.send("Hello Express");

});
app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get("/cats", (req, res) => {

   var cats_array = [
      {name: "cuddles",favorit_food: "spaghetti", age: "3", sleeping_spot:["under the bed","in sunbeam"]}, 
      {name: "caty",favorit_food: "Tunna", age: "5", sleeping_spot:["under the bed","inn the sofa"]}
  ];
  res.render('cats', {cats: cats_array});
})

app.get("/cuddles", (req, res) => {
   var cats_array = [
      {name: "cuddles",favorit_food: "spaghetti", age: "3", sleeping_spot:["under the bed","in sunbeam"],path:"cat1.jpeg"}
  ];
   res.render('details',{cats: cats_array});
})

app.get("/caty", (req, res) => {
   var cats_array = [
      {name: "caty",favorit_food: "Tuna", age: "5", sleeping_spot:["under the bed","inn the sofa"], path:"cat2.jpeg"}
  ];
   res.render('details',{cats: cats_array});
})