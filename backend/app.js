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

// const labels = [ 
//   [ 'node_id','public_key','master_public_key','role','max_aal','max_ial' ],
//   [ 'node_id', 'amount' ],
//   [ 'node_id', 'amount' ],
//   [ 'node_id', 'amount' ],
//   [ 'namespace', 'description' ],
//   [ 'namespace' ],
//   [ 'service_id', 'service_name' ],
//   [ 'service_id' ]
// ]

app.post('/api/registerNode', (req, res) => {
  var node_id = req.body.node_id;
  var public_key = req.body.public_key;
  var master_public_key = req.body.master_public_key;
  var role = req.body.role;
  var max_aal = req.body.max_aal;
  var max_ial = req.body.max_ial;
  console.log("Post Received: %s %s %s %s %s %s",node_id,public_key,master_public_key,role,max_aal,max_ial);
});

app.listen(config.httpPort, () => {
  console.log('Listening on port ' + config.httpPort);
})
