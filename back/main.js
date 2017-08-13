// Module dependencies.
const express = require('express');
const errorHandler = require('errorhandler');
const dotenv = require('dotenv');
const path = require('path');
const chalk = require('chalk');
const logger = require('morgan');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const helmet = require('helmet');


// Load environment variables from .env file, where API keys and passwords are configured.
dotenv.load({ path: '.env' });


// Create Express server.
const app = express();
app.set('port', process.env.PORT || 8080);
app.use(expressStatusMonitor());
app.use(logger('dev'));
app.use(expressValidator());
if(process.env.NODE_ENV == 'dev') {
    bCaching = true;
    bHsts = false;
} else {
    bCaching = false;
    bHsts = true;
}
app.use(helmet({
    noCache: bCaching,
    hsts: bHsts,
}));


// app.use(helmet.xframe('allow-from', 'http://example.com'));  // Might need xframe later for testing via localhost

// Todo: implement once we're ready to run behind https
// Implement Strict-Transport-Security
//app.use(helmet.hsts({
//    maxAge: 7776000000,
//    includeSubdomains: true
//  }));


// Error Handler.
app.use(errorHandler());

console.log("Running in: "  + process.env.NODE_ENV);

// Simple endpoint
app.get('/', function(req, res) {
    res.send('DeafScoop backend stuff.');
});

// Start the server
app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green(' ✓'), app.get('port'), app.get('env')); 
    console.log('Press CTRL-C to stop\n');
});
  
module.exports = app;