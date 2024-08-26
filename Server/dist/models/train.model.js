"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Train = void 0;
const mongoose_1 = require("mongoose");
const trainSchema = new mongoose_1.Schema({
    trainID: { type: String, unique: true },
    name: { type: String, unique: true },
    destination: String,
    status: Boolean,
    start: String,
    startTime: Date,
    endTime: Date,
    ticketFare: Number,
    stops: Number,
    journeyTime: Number,
});
const Train = (0, mongoose_1.model)('trains', trainSchema);
exports.Train = Train;
