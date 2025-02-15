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
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 8080;
const app = (0, express_1.default)();
let dbName = "CV_BK";
let collectionName = "Resume";
app.use(express_1.default.json());
const dataBase = new db_1.default();
dataBase.MONGODB_URL =
    "mongodb+srv://karthikeyanbalan:Dinner1234@bk.glsqe.mongodb.net";
dataBase.dbName = dbName;
dataBase.collectionName = collectionName;
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    dataBase.getDatabase({
        dbName,
        collectionName,
        onUpdate: (innerProps) => {
            res.send({ data: innerProps.data });
        },
    });
}));
app.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = (req === null || req === void 0 ? void 0 : req.body) || {};
    if (!req.body) {
        res.status(400).send("Bad request");
        return; // Stop further execution after response
    }
    dataBase.doUpdateDatabase({
        dbName,
        collectionName,
        pushObjectData: data,
        onUpdate: (innerProps) => {
            res.json({ message: "add successful", data: req.body });
        },
    });
}));
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    console.log(`Deleting record with id: ${id}`);
    dataBase.doDeleteDatabase({
        dbName,
        collectionName,
        removeId: id,
        onUpdate: (innerProps) => {
            res.json({ message: `Record with id ${id} deleted successfully` });
        },
    });
});
app.listen(PORT, () => {
    console.log(`I am listening on port ${PORT}`);
});
