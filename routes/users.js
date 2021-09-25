var express = require('express')
var router = express.Router()
var csrf = require('csurf')
var csrfProtection = csrf({cookie: { httpOnly: true }})
const {register, login, changePassword} = require('../api/api')
const {validationServer, verifyTokenChangePassword} = require("../utils/middleware")
const {loginValidation, registerValidation, changePasswordValidation} = require("../utils/validation")


router.route("/register")
.post(csrfProtection, validationServer(registerValidation), async function(req, res) {
  try{
    const userDetails = req.body
    let response = await register(userDetails)
    res.status(200).json(response)

  }catch(error){
    res.status(400).json({message: error.message})
  }
})


router.route("/login")
.post(csrfProtection, validationServer(loginValidation), async function(req, res) {
  try{
    const loginDetails = req.body
    const {accessToken, refreshToken} = await login(loginDetails)
    res.cookie('refreshToken', refreshToken, {httpOnly: true})
    res.status(200).json({accessToken, message: "התחברות בוצעה בהצלחה"})

  }catch(error){
    res.status(400).json({message: error.message})
  }
  
})


router.route("/logout")
.post(async function(req, res) {
  res.clearCookie("refreshToken").json({})
})


router.route("/changePassword")
.put(validationServer(changePasswordValidation), verifyTokenChangePassword, async function (req, res){
  try{
    const {password, token} = req.body
    const response = await changePassword(password, token)
    res.status(200).json(response)
    

  }catch(error){
    res.status(400).json({message:error.message})
  }
   
})

module.exports = router;
