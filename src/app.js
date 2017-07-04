'use strict';

const express  = require('express');            //  make express available
const pug      = require('pug');                //  pug template engine
const Twit     = require('twit');               //  twit module
const apiParms = require('./config.js');        //  request configuration params
const T        = new Twit(apiParms);            //  get Twitter data

const app            = express();               //  sets the app framework to express

app.set('view_engine', 'pug');                  //  set pug to be the view engine
app.set('views', __dirname + '/templates');     //  set the template directory (pug files live here)
app.use(express.static(__dirname + '/public')); //  assign directory for static (unchanging) resources

// Middleware to pull Twitter objects and assign to request properties
app.get('/', function(req, res) {
    T.get('account/verify_credentials')              //  verify account credentials
        .then(function(result) {                     //  successful
            console.log('data', result.data);
            const user = result.data.screen_name;
            console.log(user);
            Promise.all([
                timeLine(user),                      //  request the "tweets timeline" entries for the user
                following(user),                     //  request the "following" entries for the user
                directMessages(user)                 //  request the "direct messages" entries for the user
            ]).then(values => {
                res.render('./templates/index.pug', {
                    timeline:  values[0].data,       //  render tweets
                    following: values[1].data.users, //  render followers
                    messages:  values[2].data        //  render direct messages
                })
            });
        })
        .catch(function(err) {                       //  error on autorization
            console.log('caught error', err.stack)
        });
});

// Start web server to listen on port 3000
app.listen(3000, function () {
    console.log('Frontend Server running on port 3000')
});









