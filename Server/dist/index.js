"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const admin_model_1 = require("./models/admin.model");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: 'http://localhost:4200', methods: ["GET", "POST", "PUT"], }));
app.use(express_1.default.json());
// @ts-ignore
mongoose_1.default.connect(process.env.MONGO_DB_URL)
    .then(r => {
    console.log('Connected with local MongoDB 👍');
    admin_model_1.Admin.findOne({ emailID: process.env.ADMIN_EMAIL }).then((r) => {
        if (!r) {
            new admin_model_1.Admin({ emailID: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PWD })
                .save()
                .then((r) => {
                console.log(`Created default ADMIN ${process.env.ADMIN_EMAIL}`);
            });
        }
    });
})
    .catch((err) => console.log(err));
app.use('/api/user/', require('./routes/user.route'));
app.use('/api/admin/', require('./routes/admin.route'));
app.use('/api/train/', require('./routes/train.route'));
app.use('/api/ticket/', require('./routes/ticket.route'));
app.listen(process.env.PORT, () => {
    console.log(`⚡ Train Ticket Booking System REST API Server Started at ${process.env.PORT}`);
});
