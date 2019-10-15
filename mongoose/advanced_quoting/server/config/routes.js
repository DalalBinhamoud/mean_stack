const mongoose = require('mongoose'),
Quote = mongoose.model('Quote')
module.exports = function(app){

app.set('view engine', 'ejs');
app.set('views', __dirname + 'views');
    app.get("/", (req,res) => {
        res.render("index")
        });
        app.get("/quotes", (req,res) => {
            Quot.find() //{ sort :{ createdAt : -1}}
            .then(data => res.render("quotes", {quotes: data}))
            .catch(err => res.json(err));
          });
          
          
          app.post('/quotes', (req, res) => {
            const quote = new Quote();
              quote.name = req.body.name;
              quote.quote = req.body.quote;
            quote.save()
              .then(newQuoteData => console.log('quote created: ', newQuoteData))
              .catch(err => {
            console.log(err);
            for (var key in err.errors) {
              req.flash('add_quote', err.errors[key].message);
          }
          });  
            res.redirect('/');
          });
          
} 