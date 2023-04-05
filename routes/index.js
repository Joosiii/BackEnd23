const express = require('express')
const router = express.Router()

const appController = require('../controller/index.js')

router.get('/', appController.landingPage)
router.get('/login', appController.loginPage)
router.post('/login', appController.submitLoginPage)
router.get('/logout', appController.logOut)
router.get('/home', appController.homePage)
router.get('/profile', appController.profilePage)
router.get('/create', appController.createProfilePage)
router.post('/create', appController.submitProfilePage)
<<<<<<< Updated upstream
router.get('/edit', appController.loadEditProfilePage)
router.post('/edit', appController.editProfilePage)
=======
router.get('/discover', appController.discoverPage)
router.get('/filter', appController.loadfilterPage)
router.post('/filter', appController.filterPage)
router.post('/discover', appController.markMatchAsSeen)


module.exports = router
>>>>>>> Stashed changes

