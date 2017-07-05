"use strict";
/**
 * Created by westcoasthawk on 7/4/17.
 */
//
//  Build then export a string of the elapsed time from receipt of a direct message until now

module.exports = (timestamp, directMessage = false) => {
    const now = new Date();
    const dmTime = new Date(timestamp);
    let etSinceDirMsg = '';
    
    const milliseconds = (now.getTime() - dmTime.getTime());
    const seconds = (milliseconds / 1000);
    const minutes = (seconds / 60);
    const hours = (minutes / 60);
    
    switch (true) {
        case seconds < 60:
            etSinceDirMsg = `${Math.round(seconds)}${directMessage ? ' seconds ago' : 's'}`;
            break;
        
        case minutes < 60:
            etSinceDirMsg = `${Math.round(minutes)}${directMessage ? ' minutes ago ' : 'm'}`;
            break;
        
        case hours < 24:
            etSinceDirMsg = `${Math.round(hours)}${directMessage ? ' hours ago' : 'h'}`;
            break;
        default:
            etSinceDirMsg = dmTime.toDateString().slice(4, 10);
            break;
    }
    
    return `${etSinceDirMsg}`;
};