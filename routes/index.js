const express = require('express')
const router = express.Router()

const appController = require('../controller/index.js')

router.get('/', appController.landingPage)

module.exports = router