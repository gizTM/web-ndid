const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios')
const https = require('https');
const fs = require('fs');
const url = require('url');
const config = require('./config');

const app = express();
app.use(cors()) // Allow CORS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// If HTTPS is enabled, redirect HTTP request to HTTPS
app.use((req, res, next) => { 
  if (config.https && !/https/.test(req.protocol)) {
    return res.redirect(307, 'https://' + url.parse('http://' + req.headers.host).hostname
      + (':' + (config.httpsPort)) + req.url);
  } else {
    next();
  }
});

const agent = new https.Agent({  
  rejectUnauthorized: false
});

app.post('/api/initNDID', (req, res) => {
  console.log('req.body: '+JSON.stringify(req.body))
  //*** */
  // res.send('Success!')
  axios.post(`http${config.ndidApiHttps ? 's' : ''}://${config.ndidApiIp}:${config.ndidApiPort}/ndid/initNDID`, JSON.stringify({
    public_key: req.body.public_key
  }), {
    headers: {
      'Content-Type': 'application/json',
    }, httpsAgent: agent 
  })
  .then(response => {
    console.log('response: '+response);
    res.send('Success!')
  })
  .catch(error => {
    console.log('error message: ', error.toString());
    console.log('error: ',error)
    console.log('')
    res.status(error.response.status).json({
      message: (error.response.data && error.response.data.error) ? error.response.data.error.message : error.response.statusText
    }).end();
  });
});

app.post('/api/approveService', (req, res) => {
  console.log('req.body: ' + JSON.stringify(req.body));

  axios.post(`http${config.ndidApiHttps ? 's' : ''}://${config.ndidApiIp}:${config.ndidApiPort}/ndid/approveService`, JSON.stringify({
    node_id: req.body.node_id,
    service_id: req.body.service_id
  }), {
    headers: {
      'Content-Type': 'application/json',
    }, httpsAgent: agent 
  })
  .then(response => {
    console.log('response: ' + response);
    res.send('Success!')
  })
  .catch(error => {
    console.log('error message: ', error.toString());
    console.log('error: ', error)
    console.log('')
    res.status(error.response.status).json({
      message: (error.response.data && error.response.data.error) ? error.response.data.error.message : error.response.statusText
    }).end();
  });
})

app.post('/api/disableServiceDestination', (req, res) => {
  console.log('req.body: ' + JSON.stringify(req.body));

  axios.post(`http${config.ndidApiHttps ? 's' : ''}://${config.ndidApiIp}:${config.ndidApiPort}/ndid/disableServiceDestination`, JSON.stringify({
    node_id: req.body.node_id,
    service_id: req.body.service_id
  }), {
    headers: {
      'Content-Type': 'application/json',
    }, httpsAgent: agent 
  })
  .then(response => {
    console.log('response: ' + response);
    res.send('Success!')
  })
  .catch(error => {
    console.log('error message: ', error.toString());
    console.log('error: ', error)
    console.log('')
    res.status(error.response.status).json({
      message: (error.response.data && error.response.data.error) ? error.response.data.error.message : error.response.statusText
    }).end();
  });
})

app.post('/api/enableServiceDestination', (req, res) => {
  console.log('req.body: ' + JSON.stringify(req.body));

  axios.post(`http${config.ndidApiHttps ? 's' : ''}://${config.ndidApiIp}:${config.ndidApiPort}/ndid/enableServiceDestination`, JSON.stringify({
    node_id: req.body.node_id,
    service_id: req.body.service_id
  }), {
    headers: {
      'Content-Type': 'application/json',
    }, httpsAgent: agent 
  })
  .then(response => {
    console.log('response: ' + response);
    res.send('Success!')
  })
  .catch(error => {
    console.log('error message: ', error.toString());
    console.log('error: ', error)
    console.log('')
    res.status(error.response.status).json({
      message: (error.response.data && error.response.data.error) ? error.response.data.error.message : error.response.statusText
    }).end();
  });
})

app.post('/api/registerNode', (req, res) => {
  console.log('req.body: '+JSON.stringify(req.body))
  //*** */
  // res.send('Success!')
  axios.post(`http${config.ndidApiHttps ? 's' : ''}://${config.ndidApiIp}:${config.ndidApiPort}/ndid/registerNode`, JSON.stringify({
    node_id: req.body.node_id,
    node_key: req.body.node_key,
    node_master_key: req.body.node_master_key,
    role: req.body.role,
    max_aal: req.body.role === 'idp' ? parseFloat(req.body.max_aal) : undefined,
    max_ial: req.body.role === 'idp' ? parseFloat(req.body.max_ial) : undefined,
    node_name: req.body.node_name
  }), {
    headers: {
      'Content-Type': 'application/json',
    }, httpsAgent: agent 
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

app.post('/api/updateNode', (req, res) => {
  console.log('req.body: ' + JSON.stringify(req.body));

  axios.post(`http${config.ndidApiHttps ? 's' : ''}://${config.ndidApiIp}:${config.ndidApiPort}/ndid/updateNode`, JSON.stringify({
    node_id: req.body.node_id,
    node_name: req.body.node_name,
    max_aal: req.body.max_aal,
    max_ial: req.body.max_ial,
  }), {
    headers: {
      'Content-Type': 'application/json',
    }, httpsAgent: agent 
  })
  .then(response => {
    console.log('response: ' + response);
    res.send('Success!')
  })
  .catch(error => {
    console.log('error message: ', error.toString());
    console.log('error: ', error)
    console.log('')
    res.status(error.response.status).json({
      message: (error.response.data && error.response.data.error) ? error.response.data.error.message : error.response.statusText
    }).end();
  });
})

app.post('/api/setNodeToken', (req, res) => {
  console.log('req.body: '+JSON.stringify(req.body))
  //*** */
  // res.send('Success!')
  axios.post(`http${config.ndidApiHttps ? 's' : ''}://${config.ndidApiIp}:${config.ndidApiPort}/ndid/setNodeToken`, JSON.stringify({
    node_id: req.body.node_id,
    amount: parseInt(req.body.amount)
  }), {
    headers: {
      'Content-Type': 'application/json',
    }, httpsAgent: agent 
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
  axios.post(`http${config.ndidApiHttps ? 's' : ''}://${config.ndidApiIp}:${config.ndidApiPort}/ndid/addNodeToken`, JSON.stringify({
    node_id: req.body.node_id,
    amount: parseInt(req.body.amount)
  }), {
    headers: {
      'Content-Type': 'application/json',
    }, httpsAgent: agent 
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
  axios.post(`http${config.ndidApiHttps ? 's' : ''}://${config.ndidApiIp}:${config.ndidApiPort}/ndid/reduceNodeToken`, JSON.stringify({
    node_id: req.body.node_id,
    amount: parseInt(req.body.amount)
  }), {
    headers: {
      'Content-Type': 'application/json',
    }, httpsAgent: agent 
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
  axios.post(`http${config.ndidApiHttps ? 's' : ''}://${config.ndidApiIp}:${config.ndidApiPort}/ndid/namespaces`, JSON.stringify({
    namespace: req.body.namespace,
    description: req.body.description
  }), {
    headers: {
      'Content-Type': 'application/json',
    }, httpsAgent: agent 
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

app.post('/api/disableNamespace', (req, res) => {
  console.log('req.body: '+JSON.stringify(req.body))
  // console.log('req.params: ',JSON.stringify(req.params))
  //*** */
  // res.send('Success!')
  console.log('disabling namespace')
  axios.post(`http${config.ndidApiHttps ? 's' : ''}://${config.ndidApiIp}:${config.ndidApiPort}/ndid/namespaces/${req.body.namespace}/disable`,
   {
    headers: {
      'Content-Type': 'application/json',
    }, 
    httpsAgent: agent 
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

app.post('/api/enableNamespace', (req, res) => {
  console.log('req.body: '+JSON.stringify(req.body));
  console.log('enabling namespace')
  axios.post(`http${config.ndidApiHttps ? 's' : ''}://${config.ndidApiIp}:${config.ndidApiPort}/ndid/namespaces/${req.body.namespace}/enable`,
   {
    headers: {
      'Content-Type': 'application/json',
    }, 
    httpsAgent: agent 
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
  axios.post(`http${config.ndidApiHttps ? 's' : ''}://${config.ndidApiIp}:${config.ndidApiPort}/ndid/services`, JSON.stringify({
    service_id: req.body.service_id,
    service_name: req.body.service_name
  }), {
    headers: {
      'Content-Type': 'application/json',
    }, httpsAgent: agent 
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

app.post('/api/updateService', (req, res) => {
  console.log('req.body: ' + JSON.stringify(req.body));

  axios.post(
    `http${config.ndidApiHttps ? 's' : ''}://${config.ndidApiIp}:${config.ndidApiPort}/ndid/services/${req.body.service_id}`, 
    JSON.stringify({ service_name: req.body.service_name }), 
    {
      headers: { 'Content-Type': 'application/json' }, 
      httpsAgent: agent 
    }
  )
  .then(response => {
    console.log('response: ' + response);
    res.send('Success!')
  })
  .catch(error => {
    console.log('error message: ', error.toString());
    console.log('error: ', error)
    console.log('')
    res.status(error.response.status).json({
      message: (error.response.data && error.response.data.error) ? error.response.data.error.message : error.response.statusText
    }).end();
  });
})

app.post('/api/disableService', (req, res) => {
  console.log('req.body: '+JSON.stringify(req.body))
  //*** */
  // res.send('Success!')
  axios.post(`http${config.ndidApiHttps ? 's' : ''}://${config.ndidApiIp}:${config.ndidApiPort}/ndid/services/${req.body.service_id}/disable`, 
   {
    headers: {
      'Content-Type': 'application/json',
    }, 
    httpsAgent: agent 
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

app.post('/api/enableService', (req, res) => {
  console.log('req.body: '+JSON.stringify(req.body))
  //*** */
  // res.send('Success!')
  axios.post(`http${config.ndidApiHttps ? 's' : ''}://${config.ndidApiIp}:${config.ndidApiPort}/ndid/services/${req.body.service_id}/enable`, 
   {
    headers: {
      'Content-Type': 'application/json',
    }, 
    httpsAgent: agent 
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

app.post('/api/validator', (req, res) => {
  console.log('req.body: '+JSON.stringify(req.body))
  axios.post(`http${config.ndidApiHttps ? 's' : ''}://${config.ndidApiIp}:${config.ndidApiPort}/ndid/validator`, JSON.stringify({
    public_key: req.body.public_key,
    power: parseInt(req.body.power, 10)
  }), {
    headers: {
      'Content-Type': 'application/json',
    }, 
    httpsAgent: agent 
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

app.post('/api/setTimeoutBlockRegisterMqDestination', (req, res) => {
  axios.post(`http${config.ndidApiHttps ? 's' : ''}://${config.ndidApiIp}:${config.ndidApiPort}/ndid/setTimeoutBlockRegisterMqDestination`, JSON.stringify({
    blocks_to_timeout: parseInt(req.body.blocks_to_timeout)
  }), {
    headers: {
      'Content-Type': 'application/json',
    }, 
    httpsAgent: agent 
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


// Create HTTP server and HTTPS server
const httpServer = app.listen(config.httpPort);
console.log('Listening on HTTP port ' + config.httpPort);

const httpsOptions = {
  key: fs.readFileSync(config.httpsKeyPath),
  cert: fs.readFileSync(config.httpsCertPath)
};
const httpsServer = https.createServer(httpsOptions, app).listen(config.httpsPort);
console.log('Listening on HTTPS port ' + config.httpsPort);

// Shutdown

function shutdown() {
  console.log('Received kill signal, shutting down gracefully');
  httpServer.close(() => {
    console.log('Closed out remaining HTTP connection(s)');

    if (httpsServer) {
      httpsServer.close(() => {
        console.log('Closed out remaining HTTPS connection(s)');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });

  

  setTimeout(() => {
    console.log('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
