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
exports.deleteOnePost = exports.updateOnePost = exports.getOnePost = exports.getAllPosts = exports.createPost = void 0;
const typeorm_1 = require("typeorm");
const entity_1 = require("../entity");
exports.createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body } = req.body;
    const user = res.locals.user;
    const post = entity_1.Post.create({ title, body, user });
    yield post.save();
    return res.json(post);
});
exports.getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.query;
    let posts = [];
    console.log(username);
    let queryBuilder = typeorm_1.createQueryBuilder(entity_1.Post, 'post')
        .innerJoinAndSelect('post.user', 'user')
        .orderBy('post.createdAt', 'DESC');
    if (username) {
        queryBuilder = queryBuilder.where('user.username = :username', {
            username,
        });
    }
    posts = yield queryBuilder.getMany();
    return res.json(posts);
});
exports.getOnePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const post = yield entity_1.Post.findOne({ id }, { relations: ['user', 'likes'] });
    if (!post) {
        return res.status(400).json({ error: 'Post not found' });
    }
    return res.json(post);
});
exports.updateOnePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { title, body } = req.body;
    const post = yield entity_1.Post.findOne({ id }, { relations: ['user'] });
    if (!post)
        return res.status(400).json({ error: 'Post not found' });
    const isLoggedInUsersPost = res.locals.user.id === post.user.id;
    if (!isLoggedInUsersPost)
        return res.status(400).json({ error: 'Unauthorized' });
    post.title = title || post.title;
    post.body = body || post.body;
    if (title || body)
        yield post.save();
    return res.json(post);
});
exports.deleteOnePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const post = yield entity_1.Post.findOne({ id }, { relations: ['user'] });
    if (!post) {
        return res.status(400).json({ error: 'Post not found' });
    }
    const isLoggedInUsersPost = res.locals.user.id === post.user.id;
    if (!isLoggedInUsersPost)
        return res.status(400).json({ error: 'Unauthorized' });
    return res.send('delete req for a post');
});
//# sourceMappingURL=postController.js.map