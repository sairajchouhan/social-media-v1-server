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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const class_validator_1 = require("class-validator");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const cookie_1 = __importDefault(require("cookie"));
const entity_1 = require("../entity");
exports.registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    let errors = {};
    const emailUser = yield entity_1.User.findOne({ email });
    const usernameUser = yield entity_1.User.findOne({ username });
    if (emailUser)
        errors.email = 'Email is already taken';
    if (usernameUser)
        errors.username = 'Username is already taken';
    if (Object.keys(errors).length > 0)
        return res.status(400).json(errors);
    const user = entity_1.User.create({ username, email, password });
    const userProfile = entity_1.Profile.create();
    errors = yield class_validator_1.validate(user);
    if (Object.keys(errors).length > 0) {
        const sendErrors = {};
        errors.forEach((err) => {
            sendErrors[err.property] = Object.values(err.constraints)[0];
        });
        return res.status(400).json(sendErrors);
    }
    user.profile = userProfile;
    yield userProfile.save();
    yield user.save();
    return res.status(201).json(user);
});
exports.loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield entity_1.User.findOne({ email });
    if (!user)
        return res.status(400).json({ error: 'Invalid credentials' });
    const valid = yield bcryptjs_1.compare(password, user.password);
    if (!valid)
        return res.status(400).json({ error: 'Invalid credentials' });
    const token = jsonwebtoken_1.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '60m',
    });
    res.set('Set-Cookie', cookie_1.default.serialize('token', `Bearer ${token}`, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600,
        path: '/',
    }));
    return res.json(user);
});
exports.logoutUser = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.set('Set-Cookie', cookie_1.default.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0),
        path: '/',
    }));
    return res.status(200).json({ success: true });
});
//# sourceMappingURL=authController.js.map