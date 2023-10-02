"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Data_Grid_1 = __importDefault(require("./Data_Grid"));
function DataGridContainer() {
    return (React.createElement("div", null,
        React.createElement(Data_Grid_1.default, null)));
}
exports.default = DataGridContainer;
