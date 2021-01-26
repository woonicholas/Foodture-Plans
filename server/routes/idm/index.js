const controller = require('./controller.js');
const idm = require('express').Router();


idm.post('/signup',controller.signup)

idm.post('/signin',controller.signin)

module.exports = idm;

