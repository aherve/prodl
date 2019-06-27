/**
 * Main application file
 */
import * as express from 'express'
import * as http from 'http'
import * as mongoose from 'mongoose'

import config from './config/environment'
import expressConfig from './config/express'
import routesConfig from './routes'

// Connect to database
mongoose.connect(config.mongo.uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  poolSize: 20,
})

// Setup server
const app: express.Application = express();
const server = http.createServer(app)

expressConfig(app)
routesConfig(app)

// Start server
server.listen(config.port, () => {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
})

// Expose app
export default app
