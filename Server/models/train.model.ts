import {model, Schema} from "mongoose";

interface ITrain extends Document {
    id?: number;
    trainID: string;
    name: string;
    destination: string;
    status: boolean;
    start: string,
    startTime: Date | null;
    endTime: Date | null;
    ticketFare: number | null;
    stops: number | null;
    journeyTime: number | null;
}

const trainSchema: Schema = new Schema<ITrain>({
    trainID: {type: String, unique: true},
    name: {type: String, unique: true},
    destination: String,
    status: Boolean,
    start: String,
    startTime: Date,
    endTime: Date,
    ticketFare: Number,
    stops: Number,
    journeyTime: Number,
})

const Train = model<ITrain>('trains', trainSchema)

export {Train, ITrain}