"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    emailID: String,
    password: String,
});
const Admin = (0, mongoose_1.model)('admin', adminSchema);
exports.Admin = Admin;
