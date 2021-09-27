var express = require('express');
var router = express.Router();
var csrf = require('csurf')
var csrfProtection = csrf({cookie: { httpOnly: true }})
const {confirmEmail, verifyAccount} = require("../api/api");
const { sendEmailToResetPassword } = require('../utils/sendEmails');

router.route("/confirm/:token")
.get(async function(req, res){
    try{
       await confirmEmail(req.params.token)
       res.status(302).redirect("https://register-and-login-app.netlify.app/login")
    }catch(error){
        res.status(400).json({error: error.message})
    }
})


router.route('/resetPassword')
.post(csrfProtection, async function (req, res){
    try{
        const {email} = req.body
        const [userDetails, resetPasswordToken] = await verifyAccount(email)
        await sendEmailToResetPassword(userDetails, resetPasswordToken)
        res.status(200).json({message: "מייל אימות בדרך אליך, נא בדוק את תיבת המייל"})

    }catch(error){
        console.log(error)
        res.status(400).json({message: error.message})
    }
    
})


module.exports = router 