import {Request, Response} from "express";
import {Train} from "../models/train.model";

const generateTrainID = (req: Request, res: Response) => {
    let trainID = ''
    let train;
    do {
        trainID = generateID();
        Train.find({trainID: trainID}).then((r) => {
            train = r
        })
    } while (train != null)
    res.status(200).send({data: trainID})
}

const getAllTrains = async (req: Request, res: Response) => {
    await Train.find({}).then((r) =>
        res.status(200).send({
            data: r
        })).catch((error) => res.status(500).send({msg: error.message}))
}

const addTrain = async (req: Request, res: Response) => {
    const {
        trainID,
        name,
        destination,
        status,
        start,
        startTime,
        endTime,
        ticketFare,
        stops,
        journeyTime
    } = req.body


    if (!trainID) {
        return res.status(204).send({msg: 'trainID filed should not be empty'})
    }
    if (!name) {
        return res.status(204).send({msg: 'name filed should not be empty'})
    }
    if (!destination) {
        return res.status(204).send({msg: 'destination filed should not be empty'})
    }
    if (!status) {
        return res.status(204).send({msg: 'status filed should not be empty'})
    }
    if (!start) {
        return res.status(204).send({msg: 'start filed should not be empty'})
    }
    if (!startTime) {
        return res.status(204).send({msg: 'startTime filed should not be empty'})
    }
    if (!endTime) {
        return res.status(204).send({msg: 'endTime filed should not be empty'})
    }
    if (!ticketFare) {
        return res.status(204).send({msg: 'ticketFare filed should not be empty'})
    }
    if (!stops) {
        return res.status(204).send({msg: 'stops filed should not be empty'})
    }
    if (!journeyTime) {
        return res.status(204).send({msg: 'journeyTime filed should not be empty'})
    }

    const _trainName = await Train.findOne({name: name})

    if (_trainName) {
        return res.status(200).send({msg: "A train with same name already exists"})
    }

    const train = new Train({
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
    })

    train.save().then((t) => {
        res.status(200).send({msg: "Train scheduled successfully", data: t})
    }).catch((err) => {
        res.status(500).send({msg: err.message})
    })
}

const updateTrain = (req: Request, res: Response) => {
    const {
        trainID,
        name,
        destination,
        status,
        start,
        startTime,
        endTime,
        ticketFare,
        stops,
        journeyTime
    } = req.body

    Train.updateOne({trainID: trainID}, {
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
        res.status(200).send({msg: "Updated train successfully", data: tr})
    }).catch((err) => {
        res.status(500).send({msg: err.message})
    })
}
const cancelTrain = (req: Request, res: Response) => {
    const {trainID} = req.body

    Train.updateOne({trainID: trainID}, {$set: {status: false}}).then((tr) => {
        res.status(200).send({msg: "Canceled train successfully", data: tr})
    }).catch((err) => {
        res.status(500).send({msg: err.message})
    })
}

function generateID(): string {
    return 'T' + Math.floor(Math.random() * 100000 + 1);
}

export {generateTrainID, getAllTrains, addTrain, updateTrain, cancelTrain}