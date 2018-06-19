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
  axios.post('http://10.10.5.134:8080/ndid/registerNode', JSON.stringify({
    node_id: req.body.node_id,
    public_key: req.body.public_key,
    master_public_key: req.body.master_public_key,
    role: req.body.role,
    max_aal: parseFloat(req.body.max_aal),
    // max_ial: 'asdf'
    max_ial: parseFloat(req.body.max_ial)
  }), {
    headers: {
      'Content-Type': 'application/json',
  }
  })
  .then(response => {
    console.log('response: '+response);
    res.send('Success!')
  })
  .catch(error => {
    console.log('error: ', error.toString());
    res.status(error.response.status).json({
      message: (error.response.data && error.response.data.error) ? error.response.data.error.message : error.response.statusText
    }).end();
  });
});

app.post('/api/setNodeToken', (req, res) => {
  console.log('req.body: '+JSON.stringify(req.body))
  //*** */
  // res.send('Success!')
  axios.post('http://10.10.5.134:8080/ndid/setNodeToken', JSON.stringify({
    node_id: req.body.node_id,
    amount: parseInt(req.body.amount)
  }), {
    headers: {
      'Content-Type': 'application/json',
  }
  })
  .then(response => {
    console.log('response: '+response);
    res.send('Success!')
  })
  .catch(error => {
    console.log('error: ', error.toString());
    res.status(error.response.status).json({
      message: (error.response.data && error.response.data.error) ? error.response.data.error.message : error.response.statusText
    }).end();
  });
});

app.post('/api/addNodeToken', (req, res) => {
  console.log('req.body: '+JSON.stringify(req.body))
  //*** */
  // res.send('Success!')
  axios.post('http://10.10.5.134:8080/ndid/addNodeToken', JSON.stringify({
    node_id: req.body.node_id,
    amount: parseInt(req.body.amount)
  }), {
    headers: {
      'Content-Type': 'application/json',
  }
  })
  .then(response => {
    console.log('response: '+response);
    res.send('Success!')
  })
  .catch(error => {
    console.log('error: ', error.toString());
    res.status(error.response.status).json({
      message: (error.response.data && error.response.data.error) ? error.response.data.error.message : error.response.statusText
    }).end();
  });
});

app.post('/api/reduceNodeToken', (req, res) => {
  console.log('req.body: '+JSON.stringify(req.body))
  //*** */
  // res.send('Success!')
  axios.post('http://10.10.5.134:8080/ndid/reduceNodeToken', JSON.stringify({
    node_id: req.body.node_id,
    amount: parseInt(req.body.amount)
  }), {
    headers: {
      'Content-Type': 'application/json',
  }
  })
  .then(response => {
    console.log('response: '+response);
    res.send('Success!')
  })
  .catch(error => {
    console.log('error: ', error.toString());
    res.status(error.response.status).json({
      message: (error.response.data && error.response.data.error) ? error.response.data.error.message : error.response.statusText
    }).end();
  });
});

app.post('/api/addNamespace', (req, res) => {
  console.log('req.body: '+JSON.stringify(req.body))
  //*** */
  // res.send('Success!')
  axios.post('http://10.10.5.134:8080/ndid/namespaces', JSON.stringify({
    namespace: req.body.namespace,
    description: req.body.description
  }), {
    headers: {
      'Content-Type': 'application/json',
  }
  })
  .then(response => {
    console.log('response: '+response);
    res.send('Success!')
  })
  .catch(error => {
    console.log('error: ', error.toString());
    res.status(error.response.status).json({
      message: (error.response.data && error.response.data.error) ? error.response.data.error.message : error.response.statusText
    }).end();
  });
});

app.post('/api/deleteNamespace', (req, res) => {
  console.log('req.body: '+JSON.stringify(req.body))
  // console.log('req.params: ',JSON.stringify(req.params))
  //*** */
  // res.send('Success!')
  axios.delete('http://10.10.5.134:8080/ndid/namespaces/'+req.body.namespace, JSON.stringify({
    namespace: req.body.namespace
  }), {
    headers: {
      'Content-Type': 'application/json',
  }
  })
  .then(response => {
    console.log('response: '+response);
    res.send('Success!')
  })
  .catch(error => {
    console.log('error: ', error.toString());
    res.status(error.response.status).json({
      message: (error.response.data && error.response.data.error) ? error.response.data.error.message : error.response.statusText
    }).end();
  });
});

app.post('/api/addService', (req, res) => {
  console.log('req.body: '+JSON.stringify(req.body))
  //*** */
  // res.send('Success!')
  axios.post('http://10.10.5.134:8080/ndid/services', JSON.stringify({
    service_id: req.body.service_id,
    service_name: req.body.service_name
  }), {
    headers: {
      'Content-Type': 'application/json',
  }
  })
  .then(response => {
    console.log('response: '+response);
    res.send('Success!')
  })
  .catch(error => {
    console.log('error: ', error.toString());
    res.status(error.response.status).json({
      message: (error.response.data && error.response.data.error) ? error.response.data.error.message : error.response.statusText
    }).end();
  });
});

app.post('/api/deleteService', (req, res) => {
  console.log('req.body: '+JSON.stringify(req.body))
  //*** */
  // res.send('Success!')
  axios.delete('http://10.10.5.134:8080/ndid/services/'+req.body.service_id, JSON.stringify({
    service_id: req.body.service_id
  }), {
    headers: {
      'Content-Type': 'application/json',
  }
  })
  .then(response => {
    console.log('response: '+response);
    res.send('Success!')
  })
  .catch(error => {
    console.log('error: ', error.toString());
    res.status(error.response.status).json({
      message: (error.response.data && error.response.data.error) ? error.response.data.error.message : error.response.statusText
    }).end();
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
