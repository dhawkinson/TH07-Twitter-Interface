'use strict';

//  Require all packages for the app
//===================================================
const express      = require('express');                     //  express as a framework
const router       = express.Router();
const bodyParser   = require('body-parser');                 //  body-parser - to handle request parsing
const cookieParser = require('cookie-parser');               //  cookie-parser - to handle cookie parsing
const path         = require('path');                        //  path director
const app          = express();                              //  equate the app to express
const index        = require('./routes/index');              //  establish the root route
const config       = require('./configurators/twitData');   //  twitter configuration data

// call express service modules
//===================================================
app.use(bodyParser.urlencoded({ extended: false }));     //  std express module
app.use(cookieParser());                                 //  std express module
app.use(express.static('public'));                       //  express static file service

// app.set is used to set app parameters
//===================================================
app.set('views', './views');                             //  set the views folder
app.set('view engine', 'pug');                           //  set view engine to pug

//  call middleware modules
//===================================================
app.use('/', index);

//  call error handling
//===================================================
app.use((req, res, next) => {
    const err = new Error('Sorry, your file was not where it was expected');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    if (err.status !== 404) {
        err.message = "Sorry, there was an unspecified error";
    }
    if (app.get('env') === 'development') {
        res.render('error', {
            status: res.statusCode,
            message: err.message,
            error: err
        });
    } else {
        res.render('error', {
            status: res.statusCode,
            message: err.message,
            error: {}
        });
    }
});

app.listen(3000, () => {
    "use strict";
    console.log('The magic happens on localhost:3000!')
});

module.exports = app;