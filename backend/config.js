const path = require("path")

const config = {
  httpPort: process.env.HTTP_PORT || 2201,
  httpsPort: process.env.HTTPS_PORT || 8443,
  https: process.env.HTTPS || true,
  httpsKeyPath: path.join(__dirname, 'keys', 'localhost.key'),
  httpsCertPath: path.join(__dirname, 'keys', 'localhost.crt'),
  ndidApiIp: process.env.NDID_API_IP || '10.10.5.134',
  ndidApiPort: process.env.NDID_API_PORT || 8080,
  ndidApiHttps: process.env.NDID_API_HTTPS || false,
  staticFolder: path.join(__dirname, 'public')
}

module.exports = config
