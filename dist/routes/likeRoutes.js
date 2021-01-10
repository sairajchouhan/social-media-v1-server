"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const likeController_1 = require("../controllers/likeController");
const auth_1 = require("../middlewares/auth");
const router = express_1.Router();
router.get('/:pid', auth_1.auth, likeController_1.toggleLike);
exports.default = router;
//# sourceMappingURL=likeRoutes.js.map