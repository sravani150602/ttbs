"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ticket_controller_1 = require("../controllers/ticket.controller");
const router = express_1.default.Router();
router.post('/getTicketsByUser', ticket_controller_1.getAllTicketsByUser);
router.get('/', ticket_controller_1.getAllTickets);
router.post('/', ticket_controller_1.bookTicket);
router.post('/cancelTicket', ticket_controller_1.cancelTicket);
module.exports = router;
