var express = require('express')
var router = express.Router()
const {getDetails} = require("../api/api")
const {verifyToken} = require("../utils/middleware")

router.route('/')
.get(verifyToken, async function (req, res){
    const userDetails = await getDetails(req.headers["authorization"].replace('Bearer ', ''))
    res.status(200).json(userDetails)
})


module.exports = router