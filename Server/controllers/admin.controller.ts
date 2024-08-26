import {Request, Response} from "express";
import {Admin} from "../models/admin.model";

const loginAdmin = async (req: Request, res: Response) => {
    const {emailID, password} = req.body

    const user = await Admin.findOne({emailID: emailID})

    if (!user) {
        return res.status(200).send({msg: 'The user with the email id not present'})
    }

    if (user.password != password) {
        return res.status(200).send({msg: 'Incorrect password'})
    } else {
        res.status(200).send({msg: 'login successfully', data: true})
    }
}

export {loginAdmin}