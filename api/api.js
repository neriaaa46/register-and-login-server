const db = require("../utils/dbConnect")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const {sendEmailToConfirm} = require("../utils/sendEmails")


async function register({firstName, lastName, password, email}){
    password = await bcrypt.hash(password, 10)
    const connection = await db
    const sql = `select email from users where email = ?`
    const [[emailExists]] = await connection.query(sql, [email])

    if(emailExists){
         throw Error("אימייל זה קיים במערכת")

    } else{
        const sql = `insert into users set firstName = ?, lastName = ?, email = ?, password= ?` 
        const user = await connection.query(sql, [firstName, lastName, email, password], function(err){
            if(err) throw Error("שגיאת מערכת בהוספת משתמש")
        })
        sendEmailToConfirm(user[0].insertId, firstName, lastName, email)
        return {message: "Registration succeeded"}
    }
}


async function login({email, password}){
    connection = await db 
    const sql = `select * from users where email = ?`
    const [[userDetails]] = await connection.query(sql, [email])
    
    if(!userDetails){
        throw Error("אימייל זה לא קיים במערכת")

    } else if(!await bcrypt.compare(password, userDetails.password)){
        throw Error("סיסמא אינה נכונה")

    } else if(!userDetails.confirmEmail){
        throw Error("חשבון לא אומת")

    } else {
        const accessToken = jwt.sign({id:userDetails.id},process.env.SECRET_KEY, { expiresIn: '25m' })
        const refreshToken = jwt.sign({id:userDetails.id}, process.env.SECRET_KEY, { expiresIn: '1y' })
        return {accessToken, refreshToken}
    }
}



async function confirmEmail(token){
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY)
    const {id} = decodeToken
    
    const connection = await db 
    const sql = `update users set confirmEmail = ?  where id = ?`
    connection.query(sql, [1,id], function (err) {
        if (err) throw Error("שגיאה באימות מייל")
      })
}


async function getDetails(jwtToken){
    const details = jwt.decode(jwtToken)
    
    const connection = await db
    const sql = `select firstName, lastName, email from users where id = ?`
    const [[userDetails]] = await connection.query(sql, [details.id], function (err){
        if (err) throw Error('שגיאה בהבאת נתונים')
    })
    return userDetails
}   


async function verifyAccount(email){
    const connection = await db
    const sql = 'select id, firstName, lastName, email from users where email = ?'
    const [[userDetails]] = await connection.query(sql, [email])
    if(!userDetails) throw Error('חשבון זה לא קיים במערכת')
    
    const resetPasswordToken = jwt.sign({id:userDetails.id}, process.env.SECRET_KEY, { expiresIn: '1h' })
    return [userDetails, resetPasswordToken]
}


async function changePassword(password, token){
    password = await bcrypt.hash(password, 10)
    const {id} = jwt.decode(token)

    const connection = await db 
    const sql = `update users set password = ? where id = ?`
    connection.query(sql, [password,id], function (err) {
        if (err) throw Error("שגיאה בעדכון סיסמא")
      })

    return {message: "איפוס סיסמא בוצע בהצלחה, הנך עובר לעמוד ההתחברות"}
}


module.exports = {register, confirmEmail, login, getDetails, verifyAccount, changePassword}