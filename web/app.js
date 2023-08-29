const express = require('express');

const db = require('../models');
const cors = require('cors')
const helmet = require('helmet');
const morgan = require('morgan');
const session = require("express-session");
// initalize sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const swaggerUi = require('swagger-ui-express')
const cookieParser = require('cookie-parser')

// TODO: auto import every controller
const taskRoutes = require('../controllers/task-controller')
const subTaskRoutes = require('../controllers/sub-task-controller')
const userRoutes = require('../controllers/user-controller')
const listRoutes = require('../controllers/list-controller')

const app = express();

let _store = new SequelizeStore({
  db: db.sequelize,
})

let _sessionOptions = {
  secret: process.env.SESSION_SECRET,
  store: _store,
  resave: false, // we support the touch method so per the express-session docs this should be set to false
  // proxy: true, // if you do SSL outside of node.
  saveUninitialized: true,
  cookie: {
    path: '/'
  }
}

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  _sessionOptions.cookie.secure = true // serve secure cookies
}

app.use(session(_sessionOptions));
app.use(cookieParser())

_store.sync() // create the table for the Sessions if it doesn't exist

// set morgan to log info about our requests for development use.
const morganFormat = ':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - response-time :response-time ms'
app.use(morgan(morganFormat))

app.use(helmet());
// use cors
app.use(cors())

const swaggerFile = require('../swagger-output.json')
// hot-fix
app.use(['/api/v1.0/docs', '/api/v1.0/doc','/docs?'], swaggerUi.serve, swaggerUi.setup(swaggerFile))


app.use('/api/v1.0', [taskRoutes, subTaskRoutes, userRoutes, listRoutes])

app.use(function (req, res) {
    // check the url they navigated to that got them lost, and try to offer suggestions in the front end that'll match why they got lost... maybe they missed a letter in their statecode url
    res.status(404).send({ message: 'Hey, that URL/endpoint does not exist.' })
});

module.exports = app;