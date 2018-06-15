const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const config = require('./config');

const app = express();
app.use(cors()) // Allow CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use('/', (req, res) => {
  express.static(config.staticFolder, {
    lastModified: true, 
    maxAge: '1d'
  })(req, res, () => {
    res.sendFile(config.staticFolder + '/index.html');
  });
});

app.post('/api/registerNode', (req, res) => {
  
});

app.listen(config.httpPort, () => {
  console.log('Listening on port ' + config.httpPort);
})
