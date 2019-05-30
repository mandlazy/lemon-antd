"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./style");
var react_1 = __importDefault(require("react"));
var antd_1 = require("antd");
var ExampleButton = function (props) {
    return (react_1.default.createElement(antd_1.Button, { className: 'button', type: 'primary' }, props.text));
};
exports.default = ExampleButton;
