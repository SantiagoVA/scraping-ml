const puppeteer = require('puppeteer');
const fs = require('fs');
const express = require('express');
const app = express();
const indexRoutes = require('./routes/index');
const path = require('path');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));


//Body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes 
app.use('/', indexRoutes);





app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});