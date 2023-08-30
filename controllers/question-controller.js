const express = require('express');
let router = express.Router();

const authMiddleware = require('../middleware/auth')
const dataValidation = require('../middleware/data-validation')
const questionService = require('../services/question-service')
const QUESTION = 'question'

router.post(`/${QUESTION}/create`, authMiddleware.verifySession, authMiddleware.verifyJWT, express.json(), dataValidation.createQuestion, questionService.createQuestion)
router.delete(`/${QUESTION}/delete`, authMiddleware.verifySession, authMiddleware.verifyJWT, express.json(), questionService.deleteQuestion)

module.exports = router;