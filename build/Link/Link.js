"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Link = function (_a) {
    var children = _a.children, to = _a.to;
    return (react_1.default.createElement("a", { href: to },
        " ",
        children,
        " "));
};
exports.default = Link;
//# sourceMappingURL=Link.js.map