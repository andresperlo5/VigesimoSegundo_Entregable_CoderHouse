const express = require('express')
const router = express.Router()
const { GetAllMessage, CreateMessage } = require('../controllers/message.controllers')

router.get('/', GetAllMessage)  
router.post('/postmessage', CreateMessage)

module.exports = router
