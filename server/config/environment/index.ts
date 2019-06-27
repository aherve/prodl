import * as _ from 'lodash'

import developmentConfig from './development'
import productionConfig from './production'
import testConfig from './test'

export interface Config {
  allowedOrigins: string[],
  appName: string
  env: string
  mongo: {
    uri: string
  }
  port: number
  secrets: {
    session: string
  }
}

// All configurations will extend these options
// ============================================
const commonConfig: Config = {
  allowedOrigins: [],
  appName: process.env.APP_NAME || `prodl-${process.env.NODE_ENV}`,
  env: process.env.NODE_ENV || 'development',

  mongo: {
    uri: '',
  },

  // Server port
  port: Number(process.env.PORT) || 9000,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: process.env.SECRET_SESSION || 'superSecr3t'
  },

}

// Export the config object based on the NODE_ENV
// ==============================================
const config: Config = commonConfig

if (commonConfig.env === 'development') {
  _.merge(config, developmentConfig)
} else if (commonConfig.env === 'test') {
  _.merge(config, testConfig)
} else if (commonConfig.env === 'production') {
  _.merge(config, productionConfig)
} else {
  throw new Error('Please set an environment')
}

export default config