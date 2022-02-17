const express = require('express')
const router = express.Router()

const productsRoutes = require('./products.Routes')
const userRoutes = require('./users.Routes')
const infoRoutes = require('./info.Routes')
const randomRoutes = require('./random.Routes')

router.use('/productos-test', productsRoutes)
router.use('/users', userRoutes)
router.use('/info', infoRoutes)
router.use('/random', randomRoutes)

module.exports = router
