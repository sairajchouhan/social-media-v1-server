"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentController_1 = require("../controllers/commentController");
const auth_1 = require("../middlewares/auth");
const router = express_1.Router();
router.route('/:pid/:cid').put(auth_1.auth, commentController_1.editComment).delete(auth_1.auth, commentController_1.deleteComment);
router.route('/:pid').get(commentController_1.getCommentsOfPost).post(auth_1.auth, commentController_1.postComment);
exports.default = router;
//# sourceMappingURL=commentRoutes.js.map