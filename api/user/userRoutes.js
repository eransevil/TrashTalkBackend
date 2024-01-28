
const express = require('express')
// const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getUser, getUsers, deleteUser, updateUser} = require('./userController')
const router = express.Router()

router.get('/', getUsers)
router.get('/:userId', getUser)
router.put('/:userId',  updateUser)
router.put('/:id',  /* requireAuth, */ updateUser)
router.delete('/:userId',  /* requireAuth, requireAdmin, */ deleteUser)

module.exports = router


