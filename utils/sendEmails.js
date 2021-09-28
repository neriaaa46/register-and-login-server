const sgMail = require("@sendgrid/mail")
sgMail.setApiKey(process.env.EMAIL_KEY)
const jwt = require('jsonwebtoken')


function sendEmailToConfirm(id, firstName, lastName, email){

    const token = jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: '1y'}) 
    const fromName = 'Authenticaion Web'

    const html = `<div style="direction:ltr">
                  <h1>Hello ${firstName} ${lastName}</h1>
                  <p>click on the link to confirm your email address</p>
                  <a href = "https://register-and-login-app.herokuapp.com/email/confirm/${token}">click here</a>
                  </div>`

    const subject = "Confirm Email"

    sendEmail(email, fromName, subject, html)
}


function sendEmailToResetPassword({firstName, lastName, email}, resetPasswordToken){

  const subject = "Reset Password"
  const fromName = "Authenticaion Web"
 
  
  const html = `<div style="direction:ltr">
  <h1>Hello ${firstName} ${lastName}</h1>
  <p>You have receiving this mail beacuse you (or someone else) have requested to reset your password account.</p>
  <p>Please click on the following link, to complete the process within one hour of receiving it.</p>
  <a href = https://register-and-login-app.netlify.app/resetPassword/${resetPasswordToken}> click here.</a>
  <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
  </div>`

  sendEmail(email, fromName, subject, html)
  
}




function sendEmail(to, fromName, subject, html){
    const msg = {to: to, from: {email: process.env.MY_EMAIL, name:fromName}, subject: subject, html: html}

      sgMail
        .send(msg)
        .then(() => {})
        .catch((error) => {
          console.error(error)
        })
}

module.exports = {sendEmailToConfirm, sendEmailToResetPassword}