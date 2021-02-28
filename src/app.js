const express = require('express');
const app = express();
const indexRoutes = require('./routes/index');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Connect DB
mongoose.connect('mongodb://localhost/scraping-ml', {useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err)
       console.error(err);
    else
       console.log("Connected to the mongodb"); 
  });


app.use(bodyParser.urlencoded({extended: true})) 
app.use(bodyParser.json())


//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

//Routes 
app.use('/', indexRoutes);



app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});