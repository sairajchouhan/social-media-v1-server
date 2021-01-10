"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const postController_1 = require("../controllers/postController");
const router = express_1.Router();
router.route('/').get(postController_1.getAllPosts).post(auth_1.auth, postController_1.createPost);
router
    .route('/:id')
    .get(postController_1.getOnePost)
    .put(auth_1.auth, postController_1.updateOnePost)
    .delete(auth_1.auth, postController_1.deleteOnePost);
exports.default = router;
//# sourceMappingURL=postRoutes.js.map