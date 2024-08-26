import {Request, Response} from "express";
import {Ticket} from "../models/ticket.model";


const getAllTickets = async (req: Request, res: Response) => {
    await Ticket.find({})
        .then((t) =>
            res.status(200).send({data: t}))
        .catch((err) => res.send({msg: err.message}))
}

const getAllTicketsByUser = (req: Request, res: Response) => {
    const {user} = req.body
    Ticket.find({user: user}).then((t) =>
        res.status(200).send({data: t}))
        .catch((err) => res.send({msg: err.message}))
}

const cancelTicket = (req: Request, res: Response) => {
    const {_id} = req.body

    Ticket.deleteOne({_id: _id}).then((r) => {
        if (r.deletedCount) res.status(200).send({msg: 'Canceled the ticket successfully', data: true})
        else res.status(200).send({msg: 'Failed Canceling ticket'})
    }).catch(err => {
        res.status(500).send({msg: err.message})
    })
}


const bookTicket = async (req: Request, res: Response) => {
    const {trainID, user, bookedAt} = req.body

    // validate request
    if (!trainID) {
        return res.status(204).send({msg: 'trainID filed should not be empty'})
    }
    if (!user) {
        return res.status(204).send({msg: 'user filed should not be empty'})
    }
    if (!bookedAt) {
        return res.status(204).send({msg: 'bookedAt filed should not be empty'})
    }


    const ticket = new Ticket({
        trainID: trainID,
        user: user,
        bookedAt: bookedAt
    })

    await ticket.save().then((t) => {
        res.status(201).send({msg: 'Ticket booked successfully', data: t})
    }).catch((err) => {
        res.status(500).send({msg: err.message})
    })
}


export {bookTicket, getAllTickets, cancelTicket, getAllTicketsByUser}