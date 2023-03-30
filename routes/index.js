const express = require('express')
const router = express.Router()

const appController = require('../controller/index.js')

router.get('/', appController.landingPage)
router.get('/profile', appController.profilePage)
router.get('/create', appController.createProfilePage)
router.post('/create', appController.submitProfilePage)

module.exports = router