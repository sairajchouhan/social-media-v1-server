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
exports.toggleLike = void 0;
const entity_1 = require("../entity");
exports.toggleLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pid } = req.params;
    const { user } = res.locals;
    const post = yield entity_1.Post.findOne({ id: pid }, { relations: ['likes'] });
    if (!post)
        return res.status(400).json({ error: 'post not found' });
    const isLiked = post.likes.find((l) => l.liker === user.username);
    console.log('isLiked ', isLiked);
    if (isLiked) {
        post.likes = post.likes.filter((l) => l.liker !== user.username);
        post.likesCount = post.likes.length;
        yield post.save();
    }
    if (!isLiked) {
        const like = entity_1.Like.create({ liker: user.username });
        yield like.save();
        post.likes.unshift(like);
        post.likesCount = post.likes.length;
        yield post.save();
    }
    return res.send(post);
});
//# sourceMappingURL=likeController.js.map