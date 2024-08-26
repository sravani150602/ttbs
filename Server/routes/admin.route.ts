import app from 'express'
import {loginAdmin} from "../controllers/admin.controller";

const router = app.Router()

router.post('/login', loginAdmin)

module.exports = router