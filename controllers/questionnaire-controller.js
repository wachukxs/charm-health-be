const express = require('express');
let router = express.Router();

const authMiddleware = require('../middleware/auth')
const dataValidation = require('../middleware/data-validation')
const questionnaireService = require('../services/questionnaire-service')
const QUESTIONNAIRE = 'questionnaire'

router.post(`/${QUESTIONNAIRE}/create`, authMiddleware.verifySession, authMiddleware.verifyJWT, express.json(), dataValidation.createQuestion, questionnaireService.createQuestionnaire)
router.delete(`/${QUESTIONNAIRE}/delete`, authMiddleware.verifySession, authMiddleware.verifyJWT, express.json(), questionnaireService.deleteQuestionnaire)

module.exports = router;