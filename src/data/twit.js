'use strict';

const express     = require('express');                          //  make express available
const config      = require(__dirname + '/config/config.js');    //  twitter API keys
const twit        = require(__dirname + '/data/twit.js');        //  twitter API data

// This function takes a twitter OAuth object and pulls a User object
function getUser(config) {
    return new twit(config);     
}

// This function takes a Twitter user object and pulls the latest 5 sent messages
function getDirectMessages(user) {
    return user.get('direct_messages/sent', { screen_name: user.screen_name, count: 5 });
}

// This function takes a Twitter user object and pulls the 5 latest tweets from your timeline
function getTimeline(user) {
    return user.get('tweets/user_timeline', { screen_name: user.screen_name, count: 5 });
}

// This function takes a Twitter user object and pulls 5 people you are following
function getFollowing(user) {
    return user.get('friends/list', { screen_name: user.screen_name , count: 5 });
}

// Module exports to allow the functions to be used in the other JS files
module.exports.getUser = getUser;
module.exports.getDirectMessages = getDirectMessages;
module.exports.getTimeline = getTimeline;
module.exports.getFollowing = getFollowing;
