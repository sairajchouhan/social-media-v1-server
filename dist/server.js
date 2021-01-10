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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const likeRoutes_1 = __importDefault(require("./routes/likeRoutes"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    app.use(cors_1.default({
        credentials: true,
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200,
    }));
    app.use(express_1.default.json());
    app.use(morgan_1.default('dev'));
    app.use(cookie_parser_1.default());
    app.use('/users', userRoutes_1.default);
    app.use('/auth', authRoutes_1.default);
    app.use('/posts', postRoutes_1.default);
    app.use('/comments', commentRoutes_1.default);
    app.use('/like', likeRoutes_1.default);
    app.get('/', (_, res) => {
        res.send('working');
    });
    typeorm_1.createConnection()
        .then(() => {
        console.log('conection established');
    })
        .catch((err) => {
        console.log('error in connecting database');
        console.log(err);
    });
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log('server started');
    });
}))();
//# sourceMappingURL=server.js.map