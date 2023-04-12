"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUser = exports.CartItem = exports.Transaction = void 0;
var firestore_1 = require("firebase/firestore");
var firebase_1 = require("./firebase");
var main_1 = require("./main");
//SECTION - Transaction
var Transaction = /** @class */ (function () {
    function Transaction(data) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.id = (_a = data === null || data === void 0 ? void 0 : data.id) !== null && _a !== void 0 ? _a : "";
        this.label = (_b = data === null || data === void 0 ? void 0 : data.label) !== null && _b !== void 0 ? _b : "";
        this.path = (_c = data === null || data === void 0 ? void 0 : data.path) !== null && _c !== void 0 ? _c : "";
        this.ref = (_d = data === null || data === void 0 ? void 0 : data.ref) !== null && _d !== void 0 ? _d : "";
        this.refid = (_e = data === null || data === void 0 ? void 0 : data.refid) !== null && _e !== void 0 ? _e : "";
        this.timestamp = main_1.CDate.toNumber(data === null || data === void 0 ? void 0 : data.timestamp);
        this.type = (_f = data === null || data === void 0 ? void 0 : data.type) !== null && _f !== void 0 ? _f : "product";
        this.user = (_g = data === null || data === void 0 ? void 0 : data.user) !== null && _g !== void 0 ? _g : "";
        this.value = (_h = data === null || data === void 0 ? void 0 : data.value) !== null && _h !== void 0 ? _h : 0;
    }
    return Transaction;
}());
exports.Transaction = Transaction;
//!SECTION
//SECTION - CartItem
var CartItem = exports.CartItem = /** @class */ (function () {
    function CartItem(data) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.id = (_a = data === null || data === void 0 ? void 0 : data.id) !== null && _a !== void 0 ? _a : "";
        this.refid = (_b = data === null || data === void 0 ? void 0 : data.refid) !== null && _b !== void 0 ? _b : "";
        this.feature = (_c = data === null || data === void 0 ? void 0 : data.feature) !== null && _c !== void 0 ? _c : "";
        this.label = (_d = data === null || data === void 0 ? void 0 : data.label) !== null && _d !== void 0 ? _d : "";
        this.price = (_e = data === null || data === void 0 ? void 0 : data.price) !== null && _e !== void 0 ? _e : 0;
        this.amount = (_f = data === null || data === void 0 ? void 0 : data.amount) !== null && _f !== void 0 ? _f : 1;
        this.user = (_g = data === null || data === void 0 ? void 0 : data.user) !== null && _g !== void 0 ? _g : "";
    }
    CartItem.prototype.val = function () {
        return Object.entries(this)
            .filter(function (_a) {
            var key = _a[0], value = _a[1];
            return value instanceof Function === false && ["id"].includes(key) === false;
        })
            .reduce(function (data, _a) {
            var _b;
            var key = _a[0], value = _a[1];
            return Object.assign(data, (_b = {}, _b[key] = value, _b));
        }, {
            timestamp: (0, firestore_1.serverTimestamp)(),
        });
    };
    CartItem.collection = function () {
        return (0, firestore_1.collection)(firebase_1.db, "store", this.prefix, "cart");
    };
    CartItem.doc = function (id) {
        return (0, firestore_1.doc)(firebase_1.db, "store", this.prefix, "cart", id);
    };
    CartItem.add = function (user, item) {
        return __awaiter(this, void 0, void 0, function () {
            var id, title, feature, price, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!user.uid) return [3 /*break*/, 2];
                        id = item.id, title = item.title, feature = item.feature, price = item.price;
                        data = new CartItem({
                            label: title,
                            refid: id,
                            user: user.uid,
                            feature: feature,
                            price: price,
                            amount: 1,
                        });
                        return [4 /*yield*/, (0, firestore_1.addDoc)(this.collection(), data.val())];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    CartItem.remove = function (user, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(user.uid && item.id)) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, firestore_1.deleteDoc)(this.doc(item.id))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    CartItem.prefix = "".concat(process.env.REACT_APP_PREFIX);
    return CartItem;
}());
//!SECTION
//SECTION - CUser
var CUser = exports.CUser = /** @class */ (function () {
    function CUser(data) {
        var _a, _b, _c;
        this.loading = (_a = data === null || data === void 0 ? void 0 : data.loading) !== null && _a !== void 0 ? _a : true;
        this.transactions = (_b = data === null || data === void 0 ? void 0 : data.transactions) !== null && _b !== void 0 ? _b : [];
        this.cart = (_c = data === null || data === void 0 ? void 0 : data.cart) !== null && _c !== void 0 ? _c : [];
    }
    CUser.prototype.trans = function () {
        var _this = this;
        return {
            sum: function () {
                return _this.transactions.reduce(function (total, item) { return total + item.value; }, 0);
            },
            isPurchase: function (id) {
                return _this.transactions.findIndex(function (item) { return item.refid === id; }) > -1;
            },
        };
    };
    CUser.prototype.Cart = function () {
        var _this = this;
        return {
            sum: function () {
                return _this.cart.reduce(function (total, cart) { return total + cart.amount * cart.price; }, 0);
            },
            added: function (id) {
                return _this.cart.findIndex(function (c) { return c.refid === id; }) > -1;
            },
            remove: function (user, doc) { return __awaiter(_this, void 0, void 0, function () {
                var cart;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cart = this.cart.find(function (c) { return c.refid === doc.id; });
                            if (!cart) return [3 /*break*/, 2];
                            return [4 /*yield*/, CartItem.remove(user, cart)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); },
        };
    };
    CUser.collection = function () {
        return (0, firestore_1.collection)(firebase_1.db, "store", this.prefix, "transactions");
    };
    CUser.watch = function (user, callback) {
        var userdata = new CUser();
        var unwatchTransaction = (0, firestore_1.onSnapshot)((0, firestore_1.query)(this.collection(), (0, firestore_1.where)("user", "==", user.uid)), function (snapshot) {
            var transactions = snapshot.docs.map(function (doc) {
                return new Transaction(__assign(__assign({}, doc.data()), { id: doc.id }));
            });
            userdata = new CUser(__assign(__assign({}, userdata), { transactions: transactions }));
            callback(userdata);
        });
        var unwatchCart = (0, firestore_1.onSnapshot)((0, firestore_1.query)(CartItem.collection(), (0, firestore_1.where)("user", "==", user.uid)), function (snapshot) {
            var cart = snapshot.docs.map(function (doc) { return new CartItem(__assign(__assign({}, doc.data()), { id: doc.id })); });
            userdata = new CUser(__assign(__assign({}, userdata), { cart: cart }));
            callback(userdata);
        });
        return function () {
            unwatchTransaction();
            unwatchCart();
        };
    };
    CUser.prefix = "".concat(process.env.REACT_APP_PREFIX);
    return CUser;
}());
//!SECTION
