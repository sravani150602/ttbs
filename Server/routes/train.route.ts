import app from 'express'
import {addTrain, cancelTrain, generateTrainID, getAllTrains, updateTrain} from "../controllers/train.controller";

const router = app.Router()

router.get('/getID', generateTrainID)
router.get('/', getAllTrains)
router.post('/', addTrain)
router.put('/', updateTrain)
router.post('/cancelTrain', cancelTrain)

module.exports = router