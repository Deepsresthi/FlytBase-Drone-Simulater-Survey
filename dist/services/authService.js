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
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const register = (_a) => __awaiter(void 0, [_a], void 0, function* ({ username, email, password }) {
    let user = yield User_1.User.findOne({ email });
    if (user) {
        throw new Error('User already exists');
    }
    user = new User_1.User({ username, email, password });
    yield user.save();
    const payload = { userId: user.id };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
});
exports.register = register;
const login = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
    const user = yield User_1.User.findOne({ email });
    if (!user) {
        throw new Error('Invalid credentials');
    }
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }
    const payload = { userId: user.id };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
});
exports.login = login;
