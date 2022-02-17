const express = require('express')
const router = express.Router()
const passport = require('passport')

const { RegisterUSer, LoginUSer, LogoutUSer } = require('../controllers/users.controllers')

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/registerSuccess', (req, res) => {
    res.render('registerSuccess')
})

router.get('/userExists', (req, res) => {
    res.render('userExists')
})

router.post('/register', passport.authenticate('local-register', {
    successRedirect: '/api/users/registerSuccess',
    failureRedirect: '/api/users/userExists'
}))

router.get('/errorCredentials', (req, res) => {
    res.render('errorCredentials')
})
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/api/productos-test',
    failureRedirect: '/api/users/errorCredentials'
}))
router.get('/logout', LogoutUSer)

module.exports = router
