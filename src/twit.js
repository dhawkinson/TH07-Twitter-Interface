/**
 * Created by westcoasthawk on 6/29/17.
 */
//      Enables the Twit plugin to be used

const Twit     = require('twit');            //  twit module
const apiParms = require('./config.js');     //  request configuration params

//  NOTE:   the left side of these named pairs act as keywords
const T = new Twit({
    consumer_key            : apiParms.consumerKey,
    consumer_secret         : apiParms.consumerSecret,
    access_token            : apiParms.accessToken,
    access_token_secret     : apiParms.accessTokenSecret,
    owner                   : apiParms.owner,
    owner_id                : apiParms.ownerId,
    timeout_ms              : 60*1000,  // optional HTTP request timeout to apply to all requests.
});

console.log(T);

//      *****   possible fields of interest     ****
//
//      Object      Field                   Comment
//
//      tweet       favorite_count          Indicates approximately how many times this Tweet has been liked
//                  id_str                  The string representation of the unique identifier for this Tweet
//                  in_reply_to_screen_name If reply, will contain the screen name of original Tweet’s author
//                  retweet_count           Number of times this Tweet has been retweeted
//                  text                    The actual UTF-8 text of the status update.
//                  user                    The user who posted this Tweet
//
//      user        description             The user-defined UTF-8 string describing their account.
//                  followers_count         The number of followers this account currently has.
//                  friends_count           The number of users this account is following (AKA “followings”)
//                  id_str                  The string representation of the unique identifier for this User.
//                  name                    The name of the user, as they’ve defined it.
//                  screen_name             The screen name/handle/alias this user identifies themselves with.
//
//      entity      N/A

// This function takes a twitter OAuth object and pulls a User object
//
// Twit has promise support; you can use the callback API,
// promise API, or both at the same time.
//
function getUser(T) {
    T.get('account/verify_credentials', { skip_status: true })
        // callback logic split between .catch (error) & .then (success)
        .then(function (result) {
            // `result` is an Object with keys "data" and "resp".
            // `data` and `resp` are the same objects as the ones passed
            // to the callback.
            // See https://github.com/ttezel/twit#tgetpath-params-callback for details.
            
            console.log('data', result.data);
            const user = result.data.owner;
        })
        .catch(function(err) {
            console.log('caught error', err.stack)
        });
    return user
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


