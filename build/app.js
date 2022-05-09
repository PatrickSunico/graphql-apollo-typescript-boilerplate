"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const one = 1;
const two = 2;
app.use((0, morgan_1.default)("dev"));
// Enables JSON Parse
app.use(express_1.default.json());
// Enables URL Parameter Requests
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
// _to ignore eslint rules for mandatory declarations
app.get("/", (_req, res) => res.send(`1 + 2 = ${one + two}`));
app.listen(PORT, () => {
    console.log(`Server Running at ${PORT}`);
});
console.log(`[app]: http://localhost:${PORT}`);
