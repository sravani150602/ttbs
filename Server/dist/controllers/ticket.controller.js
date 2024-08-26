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
exports.getAllTicketsByUser = exports.cancelTicket = exports.getAllTickets = exports.bookTicket = void 0;
const ticket_model_1 = require("../models/ticket.model");
const getAllTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield ticket_model_1.Ticket.find({})
        .then((t) => res.status(200).send({ data: t }))
        .catch((err) => res.send({ msg: err.message }));
});
exports.getAllTickets = getAllTickets;
const getAllTicketsByUser = (req, res) => {
    const { user } = req.body;
    ticket_model_1.Ticket.find({ user: user }).then((t) => res.status(200).send({ data: t }))
        .catch((err) => res.send({ msg: err.message }));
};
exports.getAllTicketsByUser = getAllTicketsByUser;
const cancelTicket = (req, res) => {
    const { _id } = req.body;
    ticket_model_1.Ticket.deleteOne({ _id: _id }).then((r) => {
        if (r.deletedCount)
            res.status(200).send({ msg: 'Canceled the ticket successfully', data: true });
        else
            res.status(200).send({ msg: 'Failed Canceling ticket' });
    }).catch(err => {
        res.status(500).send({ msg: err.message });
    });
};
exports.cancelTicket = cancelTicket;
const bookTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { trainID, user, bookedAt } = req.body;
    // validate request
    if (!trainID) {
        return res.status(204).send({ msg: 'trainID filed should not be empty' });
    }
    if (!user) {
        return res.status(204).send({ msg: 'user filed should not be empty' });
    }
    if (!bookedAt) {
        return res.status(204).send({ msg: 'bookedAt filed should not be empty' });
    }
    const ticket = new ticket_model_1.Ticket({
        trainID: trainID,
        user: user,
        bookedAt: bookedAt
    });
    yield ticket.save().then((t) => {
        res.status(201).send({ msg: 'Ticket booked successfully', data: t });
    }).catch((err) => {
        res.status(500).send({ msg: err.message });
    });
});
exports.bookTicket = bookTicket;
