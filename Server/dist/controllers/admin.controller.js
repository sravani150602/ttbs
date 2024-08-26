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
exports.loginAdmin = void 0;
const admin_model_1 = require("../models/admin.model");
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { emailID, password } = req.body;
    const user = yield admin_model_1.Admin.findOne({ emailID: emailID });
    if (!user) {
        return res.status(200).send({ msg: 'The user with the email id not present' });
    }
    if (user.password != password) {
        return res.status(200).send({ msg: 'Incorrect password' });
    }
    else {
        res.status(200).send({ msg: 'login successfully', data: true });
    }
});
exports.loginAdmin = loginAdmin;
