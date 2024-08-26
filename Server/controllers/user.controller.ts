import {Request, Response} from "express";

import {User} from '../models/user.model'

const getAllUsers = async (req: Request, res: Response) => {
	await User.find({})
	          .then((u) =>
		          res.status(200).send({data: u}))
	          .catch((err) => res.send({msg: err.message}))
}

const createUser = async (req: Request, res: Response) => {
	const {name, emailID, password, phone} = req.body

	// validate request
	if (!name) {
		return res.status(204).send({msg: 'name filed should not be empty'})
	}
	if (!emailID) {
		return res.status(204).send({msg: 'email filed should not be empty'})
	}
	if (!phone) {
		return res.status(204).send({msg: 'phone filed should not be empty'})
	}
	if (!password) {
		return res.status(204).send({msg: 'name filed should not be empty'})
	}

	// 	Check for duplicate user
	const _user = await User.findOne({emailID: emailID})

	if (_user) {
		return res.status(200).send({msg: 'The User with same emailID already exists'})
	}

	const user = new User({
		name: name,
		emailID: emailID,
		phone: phone,
		password: password
	})

	await user.save().then((u) => {
		res.status(201).send({msg: 'user created', data: u})
	}).catch((err) => {
		res.status(500).send({msg: err.message})
	})
}

const loginUser = async (req: Request, res: Response) => {
	const {emailID, password} = req.body

	const user = await User.findOne({emailID: emailID})

	if (!user) {
		return res.status(200).send({msg: 'The user with the email id not present'})
	}

	if (user.password != password) {
		return res.status(200).send({msg: 'Incorrect password'})
	} else {
		res.status(200).send({msg: 'login successfully', data: user})
	}
}


export {createUser, getAllUsers, loginUser}