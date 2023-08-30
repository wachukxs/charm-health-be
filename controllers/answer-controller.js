const express = require('express');
let router = express.Router();

const authMiddleware = require('../middleware/auth')
const dataValidation = require('../middleware/data-validation')
const answerService = require('../services/answer-service')
const ANSWER = 'answer'

router.post(`/${ANSWER}/create`, authMiddleware.verifySession, authMiddleware.verifyJWT, express.json(), dataValidation.createQuestion, answerService.createAnswer)
router.delete(`/${ANSWER}/delete`, authMiddleware.verifySession, authMiddleware.verifyJWT, express.json(), answerService.deleteAnswer)

module.exports = router;