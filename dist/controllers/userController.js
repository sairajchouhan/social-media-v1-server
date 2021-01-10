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
exports.addUserProfile = exports.getLoggedInUserProfile = exports.getUserProfile = exports.getUserDetails = exports.getLoggedInUsersDetails = exports.getAllUsersDetails = void 0;
const entity_1 = require("../entity");
exports.getAllUsersDetails = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield entity_1.User.find();
    return res.json(users);
});
exports.getLoggedInUsersDetails = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.send(res.locals.user);
});
exports.getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.username;
    console.log(username);
    const user = yield entity_1.User.findOne({ username });
    if (!user) {
        return res.status(400).json({ error: 'user not found' });
    }
    return res.json(user);
});
exports.getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.username;
    const user = yield entity_1.User.findOne({ username }, { relations: ['profile'] });
    if (!user) {
        return res.status(400).json({ error: 'user not found' });
    }
    return res.json(user);
});
exports.getLoggedInUserProfile = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user: authUser } = res.locals;
    const user = yield entity_1.User.findOne({ username: authUser.username }, { relations: ['profile'] });
    if (!user) {
        return res.status(400).json({ error: 'user not found' });
    }
    return res.json(user);
});
exports.addUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bio, photo } = req.body;
    const { user } = res.locals;
    const authUser = yield entity_1.User.findOne({ username: user.username }, { relations: ['profile'] });
    if (!authUser)
        return res.json({ error: 'user not found' });
    let userProfile = yield entity_1.Profile.findOne({
        where: { id: authUser.profile.id },
    });
    if (!userProfile)
        return res.json({ error: 'user profile not found' });
    userProfile.bio = bio || userProfile.bio;
    userProfile.photo = photo || userProfile.photo;
    authUser.profile = userProfile;
    yield userProfile.save();
    yield authUser.save();
    return res.json(authUser);
});
//# sourceMappingURL=userController.js.map