'use strict';

const express        = require('express');          //  make express available
const pug            = require('pug');              //  pug template engine
const Twit           = require('twit');             //  twitter API module
const twitData       = require('./twit.js');        //  parsed out request data

const app            = express();                   //  sets the app framework to express

const user           = twitData.userId;             //  the twitter user
const directMessages = twitData.directMessages;     //  the twitter user direct messages
const timeLine       = twitData.timeLine;           //  the twitter user timeline tweets
const following      = twitData.following;          //  the twitter user followees

app.set('view_engine', 'pug');                      //  set pug to be the view engine

app.set('views', __dirname + '/templates');         //  set the template directory (pug files live here)

app.use(express.static(__dirname + '/public'));     //  assign directory for static (unchanging) resources

// Middleware to pull Twitter objects and assign to request properties
app.get((req, res, next) => {
    //const user = twit.getUser(apiConfig.consumer_key);     //  User property from twitter for use in requests
    
    // Uses user property to request Twitter objects and assign to the request
    req.timelineTweets = timeLine(user);            //  request the "tweets timeline" entries for the user
    req.followingUsers = following(user);           //  request the "following" entries for the user
    req.directMessages = directMessages(user);      //  request the "direct messages" entries for the user
    next()                                          //  Calls next middleware module
});

// Get handler (renderer) for the main page
app.get('/', function (req, res) {
    let p0 = req.timelineTweets;                    //  iterable tweets
    let p1 = req.followingUsers;                    //  iterable followees   
    let p2 = req.directMessages;                    //  iterable direct messages
    
    // Promise.all resolves all requests then acts
    Promise.all([p0,p1,p2]).then(values => {
        res.render('./templates/index.pug', {
            timeline:  values[0].data,              //  render tweets
            following: values[1].data.users,        //  render followees
            messages:  values[2].data               //  render direct messages
        })
    });
});

// Start web server to listen on port 3000
app.listen(3000, function () {
    console.log('Frontend Server running on port 3000')
});









