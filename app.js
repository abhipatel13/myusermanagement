// const express = require('express');
const Handlebars = require('handlebars')
// const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

require('./model/db');

// import { engine } from 'express-handlebars';

const Employee = require('./model/employee.model');

const express = require("express");

const app = express();

const port = 8000 | process.env.PORT ; 

const employeeController = require('./controller/employeeController');

// const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const { engine } = require('express-handlebars');

const path = require("path");

const bodyparser = require("body-parser");

var hbs = require('express-hbs');
// const urlencoded = require('body-parser/lib/types/urlencoded');

app.use(bodyparser.urlencoded({
    extended : true
}));

app.use(bodyparser.json());

// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/layouts',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views/employee',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  }));
app.set('view engine', 'hbs');

app.set('views', __dirname + '/views');

// app.set('views', path.join(__dirname, '/views/'));

// app.engine(
//   'hbs',
//   engine({
//     extname: 'hbs',
//     defaultLayout: 'mainLayout',
//     layoutsDir: __dirname + '/views/layouts/',
//     layoutsDir: __dirname + '/views/employee/',
//   })
// );
app.set('view engine', 'hbs');

app.listen(port,()=>{
    console.log("Server Running Successfully");
});

app.use('/employee',employeeController);
app.use('/',employeeController);

