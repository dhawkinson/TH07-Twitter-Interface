"use strict";
/**
 * Created by westcoasthawk on 7/4/17.
 */
//
//  Build then export a string of the elapsed time from receipt of a direct message until now

module.exports = (timestamp, directMessage = false) => {
    const now = new Date();
    const dmTime = new Date(timestamp);
    let etSinceMsg = '';
    
    const milliseconds = (now.getTime() - dmTime.getTime());
    const seconds = (milliseconds / 1000);
    const minutes = (seconds / 60);
    const hours = (minutes / 60);
    
    switch (true) {
        case seconds < 60:
            etSinceMsg = `${Math.round(seconds)}${directMessage ? ' seconds ago' : 's'}`;
            break;
        
        case minutes < 60:
            etSinceMsg = `${Math.round(minutes)}${directMessage ? ' minutes ago ' : 'm'}`;
            break;
        
        case hours < 24:
            etSinceMsg = `${Math.round(hours)}${directMessage ? ' hours ago' : 'h'}`;
            break;
        default:
            etSinceMsg = dmTime.toDateString().slice(4, 10);
            break;
    }
    
    return `${etSinceMsg}`;
};