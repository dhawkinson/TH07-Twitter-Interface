'use strict';

const express  = require('express');                 //  make express available
const pug      = require('pug');                     //  pug template engine
const Twit     = require('twit');                    //  twit module
const apiKeys  = require('./configurators/keys');    //  request configuration params
const T        = new Twit(apiKeys);            //  get Twitter data
const index    = require('./routes/index');

const app            = express();               //  sets the app framework to express

app.set('views', __dirname + '/templates');     //  set the template directory (pug files live here)
app.set('view engine', 'pug');                  //  set pug to be the view engine

app.use(express.static(__dirname + '/public')); //  assign directory for static (unchanging) resources
app.use('/', index);                        //  assign the starting point (landing page)


// Start web server to listen on port 3000
app.listen(3000, function () {
    console.log('Frontend Server running on port 3000')
});









