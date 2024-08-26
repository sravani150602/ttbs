"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.getAllUsers = exports.createUser = void 0;
const user_model_1 = require("../models/user.model");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.User.find({})
        .then((u) => res.status(200).send({ data: u }))
        .catch((err) => res.send({ msg: err.message }));
});
exports.getAllUsers = getAllUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, emailID, password, phone } = req.body;
    // validate request
    if (!name) {
        return res.status(204).send({ msg: 'name filed should not be empty' });
    }
    if (!emailID) {
        return res.status(204).send({ msg: 'email filed should not be empty' });
    }
    if (!phone) {
        return res.status(204).send({ msg: 'phone filed should not be empty' });
    }
    if (!password) {
        return res.status(204).send({ msg: 'name filed should not be empty' });
    }
    // 	Check for duplicate user
    const _user = yield user_model_1.User.findOne({ emailID: emailID });
    if (_user) {
        return res.status(200).send({ msg: 'The User with same emailID already exists' });
    }
    const user = new user_model_1.User({
        name: name,
        emailID: emailID,
        phone: phone,
        password: password
    });
    yield user.save().then((u) => {
        res.status(201).send({ msg: 'user created', data: u });
    }).catch((err) => {
        res.status(500).send({ msg: err.message });
    });
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { emailID, password } = req.body;
    const user = yield user_model_1.User.findOne({ emailID: emailID });
    if (!user) {
        return res.status(200).send({ msg: 'The user with the email id not present' });
    }
    if (user.password != password) {
        return res.status(200).send({ msg: 'Incorrect password' });
    }
    else {
        res.status(200).send({ msg: 'login successfully', data: user });
    }
});
exports.loginUser = loginUser;
