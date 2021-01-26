const routes = require('express').Router();
const idm = require('./idm');

routes.use('/idm', idm);

routes.get('/test', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;