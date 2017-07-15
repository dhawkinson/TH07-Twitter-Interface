"use strict";
debugger;
const express        = require('express');
const router         = express.Router();
const pug            = require('pug');
const path           = require('path');                    //  path director
const config         = require('../configurators/twitData');
const etSinceMsg     = require('../configurators/etSinceMsg');
const app            = express();

// app.set is used to set app parameters
//===================================================
app.set('views', path.join(__dirname, '../', 'views'));
app.set('view engine', 'pug');                             //  set view (template) engine to pug


//  Returns 200 OK response code & representation of the requesting user on success; or 401 & an error message if not.
config.get('account/verify_credentials').then(res => {
    const user = res.data;                                 //  the results of credentialing
    
    //  Returns a variety of information about the user specified by user.screen_name
    const p0   = config.get('users/show', { screen_name: user.screen_name });
    
    //  Returns a collection of the most recent Tweets posted by the user indicated by user.screen_name
    const p1   = config.get('statuses/user_timeline', { screen_name: user.screen_name, count: 5 });
    
    //  Returns a cursored collection of user objects for every user user.screen_name is following
    const p2   = config.get('friends/list', { cursor: -1, screen_name: user.screen_name, skip_status: true, include_user_entities: false,count: 5 });
    
    //  Returns up to the 20 most recent direct messages sent to user.screen_name
    const p3   = config.get('direct_messages', { count: 5 });
    
    Promise.all([p0, p1, p2, p3]).then(values => {
        // render the index page (root route)
        app.render('index', {
            reqUser    : values[0].data, 
            tweets     : values[1].data, 
            friends    : values[2].data, 
            messages   : values[3].data,
            etSinceMsg : etSinceMsg
        }, function() {});
    }).catch(err => {
        console.log('Caught error in rendering ', err);
        if (app.get('env') === 'development') {
            res.render('error', {
                userName: user,
                status: res.statusCode,
                error: err
            });
        } else {
            res.render('error', {
                userName: user.screen_name,
                status: res.statusCode,
                error: {}
            });
        }
    });
});

module.exports = router;