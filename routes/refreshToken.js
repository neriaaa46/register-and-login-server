var express = require('express')
var router = express.Router()
var csrf = require('csurf')
var csrfProtection = csrf({cookie: { httpOnly: true, domain: "https://register-and-login-app.netlify.app", sameSite: 'none', secure: 'ture' }})
const {getTokens} = require("../utils/tokens")


router.route('/')
.post(csrfProtection, async function(req, res){
    try{
        if (!req.cookies.refreshToken) throw Error
        const jwtToken = req.headers['authorization'].replace('Bearer ', '')        
        const {accessToken, refreshToken} = await getTokens(jwtToken, req.cookies.refreshToken)

        res.cookie("refreshToken", refreshToken, {domain: "https://register-and-login-app.netlify.app", sameSite: 'none', secure: 'true'})
        res.status(200).json({accessToken})

    }catch(error){
        console.log(error);
        res.status(401).json({})
    }
    
})





module.exports = router