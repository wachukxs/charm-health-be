const express = require('express');
let router = express.Router();

const authMiddleware = require('../middleware/authentication')
const jwtMiddleware = require('../middleware/jwt-validation')
const listService = require('../services/list-service')
const LIST = 'list'

router.post(`/${LIST}/create`, authMiddleware.verifySession, jwtMiddleware.verifyJWT, express.json(), listService.createList)
router.delete(`/${LIST}/delete`, authMiddleware.verifySession, jwtMiddleware.verifyJWT, express.json(), listService.deleteList)
router.post(`/${LIST}/add-tasks`, authMiddleware.verifySession, jwtMiddleware.verifyJWT, express.json(), listService.addTasksToList)

router.get(`/${LIST}/get-all`, authMiddleware.verifySession, listService.getAllLists)

module.exports = router;