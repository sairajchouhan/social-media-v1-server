"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middlewares/auth");
const router = express_1.Router();
router.get('/', userController_1.getAllUsersDetails);
router.get('/me', auth_1.auth, userController_1.getLoggedInUsersDetails);
router.get('/:username', userController_1.getUserDetails);
router.get('/profile/me', auth_1.auth, userController_1.getLoggedInUserProfile);
router.get('/profile/:username', userController_1.getUserProfile);
router.put('/profile', auth_1.auth, userController_1.addUserProfile);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map