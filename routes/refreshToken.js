var express = require('express')
var router = express.Router()
var csrf = require('csurf')
var csrfProtection = csrf({cookie: { httpOnly: true }})
const {getTokens} = require("../utils/tokens")


router.route('/')
.post(csrfProtection, async function(req, res){
    try{
        if (!req.cookies.refreshToken) throw Error
        const jwtToken = req.headers['authorization'].replace('Bearer ', '')        
        const {accessToken, refreshToken} = await getTokens(jwtToken, req.cookies.refreshToken)

        res.cookie("refreshToken", refreshToken, {httpOnly: true, domain: "https://wizardly-hopper-f2bf68.netlify.app/"})
        res.status(200).json({accessToken})

    }catch(error){
        console.log(error);
        res.status(401).json({})
    }
    
})





module.exports = router