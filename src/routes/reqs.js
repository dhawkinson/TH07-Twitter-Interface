'use strict';

const express     = require('express');                          //  make express available
const config      = require(__dirname + '/config/config.js');    //  twitter API keys
const twit        = require(__dirname + '/data/twit.js');        //  twitter API data

const reqsRouter  = express.Router();                            //  sets the app framework to express

// Middleware to pull Twitter objects and assign to request properties
reqsRouter.get((req, res, next) => {
    const user = twit.getUser(config);                           //  User property from twitter for use in requests
    
    // Uses user property to request Twitter objects and assign to the request
    req.timelineTweets = twit.getTimeline(user);                 //  request the "tweets timeline" entries for the user
    req.followingUsers = twit.getFollowing(user);                //  request the "following" entries for the user
    req.directMessages = twit.getDirectMessages(user);           //  request the "direct messages" entries for the user
    next()                                                       //  Calls next middleware module
});

module.exports.reqsRouter = reqsRouter;
