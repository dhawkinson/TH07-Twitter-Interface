'use strict';
/**
 * Created by westcoasthawk on 7/4/17.
 */

const Twit = require('twit');
const apiParms = require('./keys.js');

const config = new Twit(apiParms);

module.exports = config;