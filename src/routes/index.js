'use strict';

const express      = require('express');                     //  require the express framework
const indexRouter  = express.Router();                       //  construct router with express

// Get handler (renderer) for the main page
indexRouter.get('/', function (req, res) {
    let p0 = req.timelineTweets;                             //  iterable tweets
    let p1 = req.followingUsers;                             //  iterable "following" users    
    let p2 = req.directMessages;                             //  iterable direct messages
    
    // Promise.all resolves all requests then acts
    Promise.all([p0,p1,p2]).then(values => {
        res.render(__dirname + '/templates/index.pug', {
            timeline:  values[0].data,                       //  render tweets
            following: values[1].data.users,                 //  render "following" users
            messages:  values[2].data                        //  render direct messages
        })
    });
});

module.exports.indexRouter = indexRouter;                    //  exports module for use elsewhere
