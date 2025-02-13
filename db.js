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
const mongodb_1 = require("mongodb");
class db {
    constructor() {
        this.MONGODB_URL = "";
        this.globalClient = null;
        this.dbName = "";
        this.collectionName = "";
    }
    setClient() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.globalClient === null) {
                this.globalClient = yield mongodb_1.MongoClient.connect(this.MONGODB_URL);
            }
            else {
                console.log("Client Already Connected");
            }
        });
    }
    terminateClient() {
        return __awaiter(this, void 0, void 0, function* () {
            this.globalClient.close();
            this.globalClient = null;
        });
    }
    getDatabase(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { onUpdate = () => "", dbName = this.dbName || "", collectionName = this.collectionName || "", } = props || {};
            yield (this === null || this === void 0 ? void 0 : this.setClient());
            const dbCollection = yield this.globalClient
                .db(dbName)
                .collection(collectionName);
            const cursor = yield dbCollection.find();
            const data = yield cursor.toArray();
            onUpdate({ data });
            yield (this === null || this === void 0 ? void 0 : this.terminateClient());
        });
    }
    doUpdateDatabase(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { onUpdate = () => "", dbName = this.dbName || "", collectionName = this.collectionName || "", pushObjectData = {}, } = props || {};
            yield (this === null || this === void 0 ? void 0 : this.setClient());
            const dbCollection = yield this.globalClient
                .db(dbName)
                .collection(collectionName);
            const insertResult = yield dbCollection.insertOne(pushObjectData);
            onUpdate(insertResult);
            yield (this === null || this === void 0 ? void 0 : this.terminateClient());
        });
    }
    doDeleteDatabase(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { onUpdate = () => "", dbName = this.dbName || "", collectionName = this.collectionName || "", removeId = "", } = props || {};
            yield (this === null || this === void 0 ? void 0 : this.setClient());
            const dbCollection = yield this.globalClient
                .db(dbName)
                .collection(collectionName);
            const insertResult = yield dbCollection.deleteOne({
                _id: new mongodb_1.ObjectId(removeId),
            });
            onUpdate(insertResult);
            yield (this === null || this === void 0 ? void 0 : this.terminateClient());
        });
    }
}
exports.default = db;
