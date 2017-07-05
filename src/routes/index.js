"use strict";
/**
 * Created by westcoasthawk on 7/4/17.
 */

const express        = require('express');
const router         = express.Router();
const twitData       = require('../configurators/twitDate');
const timeSinceTweet = require('../utils/time-since-tweet');

/* GET home page. */
// Middleware to pull Twitter objects and assign to request properties
router.get('/', function(req, res) {
    T.get('account/verify_credentials')              //  verify account credentials
        .then(function(result) {                     //  successful
            console.log('data', result.data);
            const user         = result.data.screen_name;
            let timeLine       = '';
            let following      = '';
            let directMessages = '';
            Promise.all([
                timeLine(user),                      //  request the "tweets timeline" entries for the user
                following(user),                     //  request the "following" entries for the user
                directMessages(user)                 //  request the "direct messages" entries for the user
            ]).then(values => {
                res.render('./templates/index.pug', {
                    timeLine       :  values[0].data,       //  render tweets
                    following      :  values[1].data.users, //  render followers
                    directMessages :  values[2].data        //  render direct messages
                })
            });
        })
        .catch(function(err) {                       //  error on autorization
            console.log('caught error', err.stack)
        });
});


router.get('/', (req, res, next) => {
    res.render('index');
});

router.post('/', (req, res, next) => {
    res.render('index', { multiplied: req.multiplied });
});


module.exports = router;