var express = require('express')
var router = express.Router()
var csrf = require('csurf')
var csrfProtection = csrf({cookie: { httpOnly: true , domain: "www.wizardly-hopper-f2bf68.netlify.app"}})

router.route("/")
.get(csrfProtection, function(req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken(), {domain: "www.wizardly-hopper-f2bf68.netlify.app"})
    res.json({})
})

module.exports = router