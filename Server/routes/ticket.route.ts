import app from 'express'
import {bookTicket, cancelTicket, getAllTickets, getAllTicketsByUser} from "../controllers/ticket.controller";

const router = app.Router()

router.post('/getTicketsByUser', getAllTicketsByUser)
router.get('/', getAllTickets)
router.post('/', bookTicket)
router.post('/cancelTicket', cancelTicket)

module.exports = router