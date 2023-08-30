const path = require('path');
const { Op } = require('sequelize');
const _FILENAME = path.basename(__filename);

const db = require('../models');

exports.createQuestion = (req, res) => {
    /**
     * TODO: update
     * #swagger.tags = ['Lists']
     * #swagger.parameters['name'] = {
            in: 'body',
            description: 'The name of the list',
            required: 'true',
            type: 'json',
            format: 'utf-8',
        }
        #swagger.responses[200] = {
            description: 'Good request',
            schema: {
                message: 'Hello',
                data: { $ref: '#/definitions/List' }
            }
        }
        #swagger.responses[501] = {
            description: 'Server Error executing the task',
            schema: {
                message: 'Hello. An Error Occurred.'
            }
        }
     */
    const _FUNCTIONNAME = 'createQuestion'
    console.log('hitting', _FILENAME, _FUNCTIONNAME);

    db.List.create({
        questionType: req.body.questionType,
        question: req.body.name,
        questionnaireId: req.body.questionnaireId
    }).then((result) => {
        res.status(200).json({
            message: 'Hello',
            data: result
        })
    }, (err) => {
        console.error(`'ERR in ${_FILENAME} ${_FUNCTIONNAME}:`, err)
        res.status(501).json({
            message: 'Hello. An Error Occurred.',
        })
    }).catch((error) => {
        console.error(`'ERR in ${_FILENAME} ${_FUNCTIONNAME}:`, error)
        res.status(501).json({
            message: 'We could not create user task. An error occurred'
        })
    })
}


exports.deleteQuestion = (req, res) => {
    /**
     * #swagger.tags = ['Tasks']
     * #swagger.parameters['taskId'] = {
            in: 'body',
            description: 'The task id you want to delete',
            required: 'true',
            type: 'string',
            format: 'utf-8',
        }
        #swagger.responses[200] = {
            description: 'Delete a task. data is an array of 0 or 1 representing true of false if the operation was carried out.',
            schema: {
                message: 'Hello, task deleted.',
                data: [1],
            }
        }
        #swagger.responses[501] = {
            description: 'We return 501 when an error occurred.',
            schema: {
                message: 'Hello. An Error Occurred.',
            }
        }
     */

    const _FUNCTIONNAME = 'deleteTask'
    console.log('hitting', _FILENAME, _FUNCTIONNAME);

    db.Task.destroy({
        where: {
            id: req.body.taskId
        }
    }).then((result) => {
        res.status(200).json({
            message: 'Hello, task deleted.',
            data: result
        })
    }, (err) => {
        console.error(`ERR in ${_FILENAME} ${_FUNCTIONNAME}:`, err)
        res.status(501).json({
            message: 'Hello. An Error Occurred.',
        })
    }).catch((error) => {
        console.error(`ERR in ${_FILENAME} ${_FUNCTIONNAME}:`, error)
        res.status(501).json({
            message: 'We could not delete task. An error occurred'
        })
    })

}