const controller = require('./controller.js');
const db = require('express').Router();


db.get('/getUser/:uid',controller.getUser)

db.post('/uploadUserStats/:uid', controller.uploadUserStats)

db.get('/getDailyTotals/:uid/:date',controller.getDailyTotals)

db.get('/getLogs/:uid/:date',controller.getLogs)

db.post('/postLog/:uid',controller.postLog)

db.delete('/deleteLog/:uid/:date/:doc_id',controller.deleteLog)

 
module.exports = db;