const routes = require('express').Router();
const idm = require('./idm');
const db = require('./db');
const { route } = require('./idm');

routes.use('/idm', idm);
routes.use('/db', db);

routes.get('/test', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;