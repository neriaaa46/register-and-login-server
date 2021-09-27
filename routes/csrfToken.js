var express = require('express')
var router = express.Router()
var csrf = require('csurf')
var csrfProtection = csrf({cookie: { httpOnly: true, sameSite: 'none', secure: 'true'}})

router.route("/")
.get(csrfProtection, function(req, res) {
    // res.cookie('XSRF-TOKEN', req.csrfToken(), {sameSite: 'none', secure: 'true'})
    const token = req.csrfToken()
    res.json({ xsrfToken: JSON.parse(token).slice(5)})
})

module.exports = router
