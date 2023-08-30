const path = require('path');
const _FILENAME = path.basename(__filename);

const jwt = require('jsonwebtoken')

module.exports.verifyJWT = (req, res, next) => {
    const _FUNCTIONNAME = 'verifyJWT'
    console.log('hitting', _FILENAME, _FUNCTIONNAME);

    jwt.verify(req.cookies._lettuce, process.env.JWT_SECRET, (error, decodedToken) => {
        if (error) {
            res.status(403).json({
                message: 'There is an issue with the data you provided',
                error
            })
        } else {
            next()
        }
    })
}

module.exports.verifySession = (req, res, next) => {
    const _FUNCTIONNAME = 'verifySession'
    console.log('hitting', _FILENAME, _FUNCTIONNAME);

    if (req.session.questionId) {
        next()
    } else {
        res.sendStatus(401)
    }

}