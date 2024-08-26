import {model, Schema} from "mongoose";

interface ITicket extends Document {
    id?: number;
    trainID: string;
    user: string,
    bookedAt: string
}

const trainSchema: Schema = new Schema<ITicket>({
    trainID: {type: String},
    user: {type: String},
    bookedAt: Date
})

const Ticket = model<ITicket>('tickets', trainSchema)

export {Ticket, ITicket}