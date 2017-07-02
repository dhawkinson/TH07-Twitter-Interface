/**
 * Created by westcoasthawk on 6/29/17.
 */
//      Enables the Twit plugin to be used

const apiParms = require('../config/config.js');     //  request configuration params

const OAuthToken = apiParms.config.access_token;

console.log(apiParms);
console.log(OAuthToken);

// This function takes a twitter OAuth object and pulls a User object
function getUser(OAuthToken) {
    return login;
}

// This function takes a Twitter user object and pulls the latest 5 sent messages
function getDirectMessages(user) {
    return user.get('direct_messages/sent', { screen_name: user.screen_name, count: 5 });
}

// This function takes a Twitter user object and pulls the 5 latest tweets from your timeline
function getTimeline(user) {
    return user.get('statuses/user_timeline', { screen_name: user.screen_name, count: 5 });
}

// This function takes a Twitter user object and pulls 5 people you are following
function getFollowing(user) {
    return user.get('friends/list', { screen_name: user.screen_name , count: 5 });
}

// Module exports to allow the functions to be used in the other JS files

module.exports = {
    userId         : getUser,
    directMessages : getDirectMessages,
    timeLine       : getTimeline,
    following      : getFollowing
};
