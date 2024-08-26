import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'
import {Admin} from "./models/admin.model";

dotenv.config();

const app = express();

app.use(cors({origin: 'http://localhost:4200', methods: ["GET", "POST", "PUT"],}))

app.use(express.json());

// @ts-ignore
mongoose.connect(process.env.MONGO_DB_URL)
    .then(r => {
        console.log('Connected with local MongoDB 👍')
        Admin.findOne({emailID: process.env.ADMIN_EMAIL}).then((r) => {
            if (!r) {
                new Admin({emailID: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PWD})
                    .save()
                    .then((r) => {
                        console.log(`Created default ADMIN ${process.env.ADMIN_EMAIL}`)
                    })
            }
        })
    })
    .catch((err) => console.log(err))

app.use('/api/user/', require('./routes/user.route'))
app.use('/api/admin/', require('./routes/admin.route'))
app.use('/api/train/', require('./routes/train.route'))
app.use('/api/ticket/', require('./routes/ticket.route'))

app.listen(process.env.PORT, () => {
    console.log(`⚡ Train Ticket Booking System REST API Server Started at ${process.env.PORT}`)
})