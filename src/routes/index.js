"use strict";

const express        = require('express');
const router         = express.Router();
const config         = require('../configurators/twitData');
const etSinceMsg     = require('../configurators/etSinceMsg');

/* GET home page. */
// Middleware to pull Twitter objects and assign to response properties
console.log('progress point 1');
//  render the index page (root route)
// all requests to this router will first hit this middleware
router.use(function(req, res, next) {
    config.get('account/verify_credentials', { skip_status: true })
        .then(result => {
        const user = result.data;
        console.log(user);
        Promise.all([
            config.get('users/show', { screen_name: user.screen_name }),
            config.get('statuses/user_timeline', { screen_name: user.screen_name, count: 5 }),
            config.get('friends/list', { screen_name: user.screen_name, count: 5 }),
            config.get('direct_messages', { count: 5 })
        ]).then(result => {
            res.render('index', {
                timeline         : result[0].data,
                friends          : result[1].data,
                currentUser      : result[2].data,
                incomingMessages : result[3].data,
                etSinceMsg       : etSinceMsg
            });
        }).catch(err => {
            console.log('caught error', err.stack);
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
});
console.log('progress point 2');
router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;