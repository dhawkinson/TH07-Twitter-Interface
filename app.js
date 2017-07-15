'use strict';

//  Require all packages for the app
//===================================================
const express      = require('express');                 //  express as a framework
const bodyParser   = require('body-parser');             //  body-parser - to handle request parsing
const cookieParser = require('cookie-parser');           //  cookie-parser - to handle cookie parsing
const app          = express();                          //  equate the app to express

// call express service modules
//===================================================
app.use(bodyParser.urlencoded({ extended: false }));     //  std express module
app.use(cookieParser());                                 //  std express module
app.use('/static', express.static('public'));            //  express static file service

//  call middleware modules
//===================================================
const index = require('./routes/index');             //  since index is solo in route, 'require' seems to = 'use' 

//  call error handling
//===================================================
app.use((req, res, next) => {
    "use strict";
    const err = new Error('Sorry, your page was not found.');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    "use strict";
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
    next();
});

app.listen(3000, () => {
    "use strict";
    console.log('The magic happens on localhost:3000!')
});

module.exports = app;