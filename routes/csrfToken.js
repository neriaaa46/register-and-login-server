var express = require('express')
var router = express.Router()
var csrf = require('csurf')
var csrfProtection = csrf({cookie: {sameSite: 'none', secure: 'true'}})

router.route("/")
.get(csrfProtection, function(req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken(), {sameSite: 'none', secure: 'true'})
    res.json({})
})

module.exports = router
