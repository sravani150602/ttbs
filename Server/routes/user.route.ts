import app from 'express'
import {createUser, getAllUsers, loginUser} from '../controllers/user.controller'

const router = app.Router()

router.get('/', getAllUsers)
router.post('/', createUser)
router.post('/login', loginUser)

module.exports = router