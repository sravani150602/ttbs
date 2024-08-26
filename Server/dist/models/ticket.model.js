"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
const mongoose_1 = require("mongoose");
const trainSchema = new mongoose_1.Schema({
    trainID: { type: String },
    user: { type: String },
    bookedAt: Date
});
const Ticket = (0, mongoose_1.model)('tickets', trainSchema);
exports.Ticket = Ticket;
