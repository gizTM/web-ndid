const path = require("path")

const config = {
  httpPort: 2201,
  staticFolder: path.join(__dirname, 'public')
}

module.exports = config
