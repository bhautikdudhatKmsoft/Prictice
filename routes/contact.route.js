const express = require('express')
const router = express.Router()
const { sendContactEmail } = require('../controller/contact.controller')

router.post('/contact', sendContactEmail)

module.exports = router
