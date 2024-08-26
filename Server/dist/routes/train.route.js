"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const train_controller_1 = require("../controllers/train.controller");
const router = express_1.default.Router();
router.get('/getID', train_controller_1.generateTrainID);
router.get('/', train_controller_1.getAllTrains);
router.post('/', train_controller_1.addTrain);
router.put('/', train_controller_1.updateTrain);
router.post('/cancelTrain', train_controller_1.cancelTrain);
module.exports = router;
