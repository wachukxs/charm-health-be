const path = require('path');
const _FILENAME = path.basename(__filename);

const Joi = require('joi');

const createTaskSchema = Joi.object({
    name: Joi.string()
    .min(3)
    .max(70)
    .required(),
    duration: Joi.string()
    .pattern(new RegExp(/[\d\d? Min(ute)?s?|Sec(ond)?s?|hours?]/i))
    .required(),
})

const signInSchema = Joi.object({
    googleTokenObject: Joi.object({
        idToken: Joi.string().required(),
        user: Joi.object().required(),
        scopes: Joi.any(), // array or string
        serverAuthCode: Joi.string()
    }).required(),
    authenticationType: Joi.string().pattern(new RegExp(/Google|Apple/))
    .required()
})

module.exports.createQuestionnaire = (req, res, next) => {
    const _FUNCTIONNAME = 'createQuestionnaire'
    console.log('hitting', _FILENAME, _FUNCTIONNAME);

    const { error, value } = createTaskSchema.validate(req.body);
    if (error) {
        res.status(400).json({
            message: 'There is an issue with the data you provided',
            error
        })
    } else {
        next()
    }
}


module.exports.createAnswer = (req, res, next) => {
    const _FUNCTIONNAME = 'createAnswer'
    console.log('hitting', _FILENAME, _FUNCTIONNAME);

    const { error, value } = signInSchema.validate(req.body);
    if (error) {
        res.status(400).json({
            message: 'There is an issue with the data you provided',
            error
        })
    } else {
        next()
    }
}