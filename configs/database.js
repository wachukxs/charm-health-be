const fs = require('fs');
const dotenv = require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    dialect: process.env.DEV_DB_DIALECT,
    storage: process.env.DEV_DB_URL,
    dialectOptions: {
    },
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOSTNAME,
    port: process.env.TEST_DB_PORT,
    dialect: process.env.TEST_DB_DIALECT,
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  production: {
    username: process.env.SHARED_HOST_DB_USERNAME,
    password: process.env.SHARED_HOST_DB_PASSWORD,
    database: process.env.SHARED_HOST_DB_NAME,
    host: process.env.SHARED_HOST,
    port: process.env.SHARED_HOST_DB_PORT,
    dialect: process.env.SHARED_HOST_DB_DIALECT,
    dialectOptions: {
      bigNumberStrings: true,
    //   ssl: {
    //     ca: fs.readFileSync(__dirname + '/ca-main.crt')
    //   }
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  },
  debug: { // for local testing and bug reproduction
    username: process.env.DEBUG_DB_USERNAME,
    password: process.env.DEBUG_DB_PASSWORD,
    database: process.env.DEBUG_DB_NAME,
    host: process.env.DEBUG_DB_HOSTNAME,
    port: process.env.DEBUG_DB_PORT,
    dialect: process.env.DEBUG_DB_DIALECT,
    dialectOptions: {
      bigNumberStrings: true,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  }
};