require('dotenv').config();
const express = require("express");
const config = require("config");
const passport = require("passport");
const {BasicStrategy} = require("passport-http");
const auth = require('./middleware/auth');
const app = express();
const streets = require('./app/API-PUBBLICHE/streets.js');

/////////////////////// I'M ALIVE ////////////////////

app.get('/', (req, res) => {
  res.send('I\'m alive!');
});

//////////////////// END I'M ALIVE //////////////////




/////////////////////// ROUTING ////////////////////

app.use('/api/street', streets);

//////////////////// END ROUTING ///////////////////



//////////////// ERROR HANDLING ////////////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404);
  res.end();
});

/////////////// END ERROR HANDLING //////////////////



//////////////////// SERVER START ///////////////////

var servicesStatus = {
  couchbaseVaspOk: false,
};

process.on('couchbase_vasp_connected', function(){
  servicesStatus.couchbaseVaspOk = true;
});

function startServer(){ // quando mi sono collegato al bucket metto il server in ascolto
  if(!Object.values(servicesStatus).every(el => el == true)){ // se non sono tutti a true aspetto 1 secondo
    setTimeout(startServer, 1000);
  } else {
    // START LISTENING
    const port = config.get('configuration.port');
    server = app.listen(port, () => {
      console.log('////////////////////////////////////////////////////////');
      console.log(`// VASP listening on port ${port} in localhost        //`);
      console.log('////////////////////////////////////////////////////////');
    });
  }
};

module.exports = {
  startServer,
}

////////////////// END SERVER START ///////////////////



////////////////////// SERVER STOP ////////////////////

process.on('SIGINT', gracefulStop); // alla chiusura del processo
process.on('SIGTERM', gracefulStop);

function gracefulStop(){
  console.log('Graceful stop...');
  // Stops the server from accepting new connections and finishes existing connections. (da verificare se )
  console.log('Trying to stop server');
  server.close(function(err) {
    // if error, log and exit with error (1 code)
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log('Server closed');

    // close your database connection and exit with success (0 code)
    console.log('Trying to stop db');
    require('./models/couchbaseVasp').bucket.disconnect();
    console.log('Addios!'); // Cannavacciuolo style
    process.exit(err ? 1 : 0);
  })
}
//////////////////// END SERVER STOP //////////////////
