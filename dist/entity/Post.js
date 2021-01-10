"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Base_1 = __importDefault(require("./Base"));
const User_1 = __importDefault(require("./User"));
const Comment_1 = __importDefault(require("./Comment"));
const Like_1 = __importDefault(require("./Like"));
let Post = class Post extends Base_1.default {
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Post.prototype, "body", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "likesCount", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "commentsCount", void 0);
__decorate([
    typeorm_1.OneToMany(() => Comment_1.default, (comment) => comment.post),
    __metadata("design:type", Array)
], Post.prototype, "comments", void 0);
__decorate([
    typeorm_1.OneToMany(() => Like_1.default, (like) => like.post),
    __metadata("design:type", Array)
], Post.prototype, "likes", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.default, (user) => user.posts),
    __metadata("design:type", User_1.default)
], Post.prototype, "user", void 0);
Post = __decorate([
    typeorm_1.Entity('posts')
], Post);
exports.default = Post;
//# sourceMappingURL=Post.js.map