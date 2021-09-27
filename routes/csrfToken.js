var express = require('express')
var router = express.Router()
var csrf = require('csurf')
var csrfProtection = csrf({cookie: {httpOnly: true }})

router.route("/")
.get(csrfProtection, function(req, res) {
    const token = req.csrfToken()
    res.json({ xsrfToken: token})
})

module.exports = router
