var express = require('express')
var router = express.Router()
var csrf = require('csurf')
var csrfProtection = csrf({cookie: { httpOnly: true, sameSite: 'none', secure: 'false'}})

router.route("/")
.get(csrfProtection, function(req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken(), {sameSite: 'none', secure: 'false'})
    res.json({})
})

module.exports = router
