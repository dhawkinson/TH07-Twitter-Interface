'use strict';

const express     = require('express');                          //  make express available
const pug         = require('pug');                              //  pug template engine
const twit        = require(__dirname + '/data/twit.js');        //  twitter API data
const reqsRouter  = require(__dirname + '/routes/reqs.js');      //  form the twitter requests
const indexRouter = require(__dirname + '/routes/index.js');     //  rendering start point

const app         = express();                                   //  sets the app framework to express

//  NOTE to self: each reference to 'app' (below) is a reference to the express framework
app.set('view_engine', 'pug');                                   //  set pug to be the view engine

app.set('views', __dirname + '/templates');                      //  set the template directory (pug files live here)

app.use(express.static(__dirname + '/public'));                  //  assign directory for static (unchanging) resources

//  Mount the routers

app.use("/", reqsRouter);                                       // route to capture reqs
app.use("/", indexRouter);                                      // route to render page

// Start web server to listen on port 3000
app.listen(3000, function () {
    console.log('Frontend Server running on port 3000')
});









