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
exports.auth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const entity_1 = require("../entity");
exports.auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.cookies;
        if (!token)
            throw new Error('Unauthorised');
        const jwtToken = token.split(' ')[1];
        const { id } = jsonwebtoken_1.verify(jwtToken, process.env.JWT_SECRET);
        const user = yield entity_1.User.findOne({ id });
        if (!user)
            throw new Error('Unauthorised');
        res.locals.user = user;
        return next();
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
});
//# sourceMappingURL=auth.js.map