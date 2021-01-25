module.exports = (app) => {
    const controller = require('./controller.js');
    
    app.post('/signup',controller.signup)

    app.post('/signin',controller.signin)
}