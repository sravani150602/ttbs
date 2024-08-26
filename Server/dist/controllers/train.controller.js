"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelTrain = exports.updateTrain = exports.addTrain = exports.getAllTrains = exports.generateTrainID = void 0;
const train_model_1 = require("../models/train.model");
const generateTrainID = (req, res) => {
    let trainID = '';
    let train;
    do {
        trainID = generateID();
        train_model_1.Train.find({ trainID: trainID }).then((r) => {
            train = r;
        });
    } while (train != null);
    res.status(200).send({ data: trainID });
};
exports.generateTrainID = generateTrainID;
const getAllTrains = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield train_model_1.Train.find({}).then((r) => res.status(200).send({
        data: r
    })).catch((error) => res.status(500).send({ msg: error.message }));
});
exports.getAllTrains = getAllTrains;
const addTrain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { trainID, name, destination, status, start, startTime, endTime, ticketFare, stops, journeyTime } = req.body;
    if (!trainID) {
        return res.status(204).send({ msg: 'trainID filed should not be empty' });
    }
    if (!name) {
        return res.status(204).send({ msg: 'name filed should not be empty' });
    }
    if (!destination) {
        return res.status(204).send({ msg: 'destination filed should not be empty' });
    }
    if (!status) {
        return res.status(204).send({ msg: 'status filed should not be empty' });
    }
    if (!start) {
        return res.status(204).send({ msg: 'start filed should not be empty' });
    }
    if (!startTime) {
        return res.status(204).send({ msg: 'startTime filed should not be empty' });
    }
    if (!endTime) {
        return res.status(204).send({ msg: 'endTime filed should not be empty' });
    }
    if (!ticketFare) {
        return res.status(204).send({ msg: 'ticketFare filed should not be empty' });
    }
    if (!stops) {
        return res.status(204).send({ msg: 'stops filed should not be empty' });
    }
    if (!journeyTime) {
        return res.status(204).send({ msg: 'journeyTime filed should not be empty' });
    }
    const _trainName = yield train_model_1.Train.findOne({ name: name });
    if (_trainName) {
        return res.status(200).send({ msg: "A train with same name already exists" });
    }
    const train = new train_model_1.Train({
        trainID: trainID,
        name: name,
        destination: destination,
        status: status,
        start: start,
        startTime: startTime,
        endTime: endTime,
        ticketFare: ticketFare,
        stops: stops,
        journeyTime: journeyTime,
    });
    train.save().then((t) => {
        res.status(200).send({ msg: "Train scheduled successfully", data: t });
    }).catch((err) => {
        res.status(500).send({ msg: err.message });
    });
});
exports.addTrain = addTrain;
const updateTrain = (req, res) => {
    const { trainID, name, destination, status, start, startTime, endTime, ticketFare, stops, journeyTime } = req.body;
    train_model_1.Train.updateOne({ trainID: trainID }, {
        $set: {
            name: name,
            destination: destination,
            status: status,
            start: start,
            startTime: startTime,
            endTime: endTime,
            ticketFare: ticketFare,
            stops: stops,
            journeyTime: journeyTime,
        }
    }).then((tr) => {
        res.status(200).send({ msg: "Updated train successfully", data: tr });
    }).catch((err) => {
        res.status(500).send({ msg: err.message });
    });
};
exports.updateTrain = updateTrain;
const cancelTrain = (req, res) => {
    const { trainID } = req.body;
    train_model_1.Train.updateOne({ trainID: trainID }, { $set: { status: false } }).then((tr) => {
        res.status(200).send({ msg: "Canceled train successfully", data: tr });
    }).catch((err) => {
        res.status(500).send({ msg: err.message });
    });
};
exports.cancelTrain = cancelTrain;
function generateID() {
    return 'T' + Math.floor(Math.random() * 100000 + 1);
}
