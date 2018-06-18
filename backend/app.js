const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const config = require('./config')
const axios = require('axios')

const app = express();
app.use(cors()) // Allow CORS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/registerNode', (req, res) => {
  console.log('req.body: '+JSON.stringify(req.body))
  //*** */
  // res.send('Success!')
  axios.post('http://10.10.5.134:8080/ndid/registerNode', {
    node_id: req.body.node_id,
    public_key: req.body.public_key,
    master_public_key: req.body.master_public_key,
    role: req.body.role,
    max_aal: parseFloat(req.body.max_aal),
    max_ial: parseFloat(req.body.max_ial)
  })
  .then(response => {
    console.log('response: '+response);
    res.send('Success!')
  })
  .catch(error => {
    console.log('error: ', error);
    res.status(error.statuscode).end();
  });
});

app.post('/api/setNodeToken', (req, res) => {
  console.log('req.body: '+JSON.stringify(req.body))
  //*** */
  // res.send('Success!')
  axios.post('http://10.10.5.134:8080/ndid/setNodeToken', {
    node_id: req.body.node_id,
    amount: req.body.amount
  })
  .then(response => {
    console.log(response);
    res.send('Success!')
  })
  .catch(error => {
    console.log(error);
    res.status(error.statuscode).end()
  });
});

app.post('/api/addNodeToken', (req, res) => {
  console.log('req.body: '+JSON.stringify(req.body))
  //*** */
  // res.send('Success!')
  axios.post('http://10.10.5.134:8080/ndid/addNodeToken', {
    node_id: req.body.node_id,
    amount: req.body.amount
  })
  .then(response => {
    console.log(response);
    res.send('Success!')
  })
  .catch(error => {
    console.log(error);
    res.status(error.statuscode).end()
  });
});

app.post('/api/reduceNodeToken', (req, res) => {
  console.log('req.body: '+JSON.stringify(req.body))
  //*** */
  // res.send('Success!')
  axios.post('http://10.10.5.134:8080/ndid/reduceNodeToken', {
    node_id: req.body.node_id,
    amount: req.body.amount
  })
  .then(response => {
    console.log(response);
    res.send('Success!')
  })
  .catch(error => {
    console.log(error);
    res.status(error.statuscode).end()
  });
});

app.post('/api/addNamespace', (req, res) => {
  console.log('req.body: '+JSON.stringify(req.body))
  //*** */
  // res.send('Success!')
  axios.post('http://10.10.5.134:8080/ndid/addNamespace', {
    namespace: req.body.namespace,
    description: req.body.description
  })
  .then(response => {
    console.log(response);
    res.send('Success!')
  })
  .catch(error => {
    console.log(error);
    res.status(error.statuscode).end()
  });
});

app.post('/api/deleteNamespace', (req, res) => {
  console.log('req.body: '+JSON.stringify(req.body))
  //*** */
  // res.send('Success!')
  axios.post('http://10.10.5.134:8080/ndid/deleteNamespace', {
    namespace: req.body.namespace
  })
  .then(response => {
    console.log(response);
    res.send('Success!')
  })
  .catch(error => {
    console.log(error);
    res.status(error.statuscode).end()
  });
});

app.post('/api/addService', (req, res) => {
  console.log('req.body: '+JSON.stringify(req.body))
  //*** */
  // res.send('Success!')
  axios.post('http://10.10.5.134:8080/ndid/addService', {
    service_id: req.body.service_id,
    service_name: req.body.service_name
  })
  .then(response => {
    console.log(response);
    res.send('Success!')
  })
  .catch(error => {
    console.log(error);
    res.status(error.statuscode).end()
  });
});

app.post('/api/deleteService', (req, res) => {
  console.log('req.body: '+JSON.stringify(req.body))
  //*** */
  // res.send('Success!')
  axios.post('http://10.10.5.134:8080/ndid/deleteService', {
    service_id: req.body.service_id
  })
  .then(response => {
    console.log(response);
    res.send('Success!')
  })
  .catch(error => {
    console.log(error);
    res.status(error.statuscode).end()
  });
});

// Serve static files
app.use('/', (req, res) => {
  express.static(config.staticFolder, {
    lastModified: true, 
    maxAge: '1d'
  })(req, res, () => {
    res.sendFile(config.staticFolder + '/index.html');
  });
});

app.listen(config.httpPort, () => {
  console.log('Listening on port ' + config.httpPort);
})
