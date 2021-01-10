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
exports.getCommentsOfPost = exports.deleteComment = exports.editComment = exports.postComment = void 0;
const entity_1 = require("../entity");
exports.postComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pid } = req.params;
    const { body } = req.body;
    const { user } = res.locals;
    const post = yield entity_1.Post.findOne({ id: pid }, { relations: ['comments'] });
    if (!body || body.trim() === '')
        return res.status(400).json({ error: 'body cannot be empty' });
    if (!post)
        return res.status(400).json({ error: 'Post not found' });
    const comment = entity_1.Comment.create({
        body,
        commentor: user.username,
        postId: post.id,
    });
    yield comment.save();
    post.comments.unshift(comment);
    post.commentsCount = post.comments.length;
    yield post.save();
    return res.json(comment);
});
exports.editComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cid, pid } = req.params;
    const { user } = res.locals;
    const { body } = req.body;
    if (!body || body.trim() === '')
        return res.status(400).json({ error: 'body cannot be empty' });
    const post = yield entity_1.Post.findOne({ id: pid }, { relations: ['comments'] });
    const comment = yield entity_1.Comment.findOne({ id: cid });
    if (!post)
        return res.status(400).json({ error: 'post not found' });
    if (!comment)
        return res.status(400).json({ error: 'comment not found' });
    const postHasComment = post.comments.find((c) => c.id === cid);
    const commentBelongsToLoggedInUser = comment.commentor === user.username;
    if (!postHasComment)
        return res
            .status(400)
            .json({ error: 'post does not have the given comment' });
    if (!commentBelongsToLoggedInUser)
        return res.status(400).json({ error: 'unauthorized' });
    comment.body = body || comment.body;
    yield comment.save();
    return res.json(comment);
});
exports.deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cid, pid } = req.params;
    const { user } = res.locals;
    const post = yield entity_1.Post.findOne({ id: pid }, { relations: ['comments'] });
    const comment = yield entity_1.Comment.findOne({ id: cid });
    if (!post)
        return res.status(400).json({ error: 'post not found' });
    if (!comment)
        return res.status(400).json({ error: 'comment not found' });
    const postHasComment = post.comments.find((c) => c.id === cid);
    const commentBelongsToLoggedInUser = comment.commentor === user.username;
    if (!postHasComment)
        return res
            .status(400)
            .json({ error: 'post does not have the given comment' });
    if (!commentBelongsToLoggedInUser)
        return res.status(400).json({ error: 'unauthorized' });
    yield comment.remove();
    post.commentsCount = post.comments.length - 1;
    yield post.save();
    return res.json({ message: 'comment deleted' });
});
exports.getCommentsOfPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pid } = req.params;
    const load = 5;
    let { cursor } = req.query;
    cursor = parseInt(cursor);
    if (!cursor)
        cursor = 0;
    const skip = cursor;
    const post = yield entity_1.Post.findOne({ id: pid });
    if (!post)
        return res.status(400).json({ error: 'post not found' });
    const comments = yield entity_1.Comment.find({
        where: { postId: pid },
        order: { createdAt: 'DESC' },
        skip,
        take: load,
    });
    return res.json({ data: comments, nextCursor: cursor + load });
});
//# sourceMappingURL=commentController.js.map