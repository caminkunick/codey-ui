"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.db = exports.app = void 0;
var app_1 = require("firebase/app");
var auth_1 = require("firebase/auth");
var firestore_1 = require("firebase/firestore");
if (!process.env.REACT_APP_FIREBASE_CONFIG) {
    throw new Error('please defined "REACT_APP_FIREBASE_CONFIG"');
}
var config = JSON.parse(window.atob(process.env.REACT_APP_FIREBASE_CONFIG));
exports.app = (0, app_1.initializeApp)(config);
exports.db = (0, firestore_1.initializeFirestore)(exports.app, {
    experimentalForceLongPolling: true,
});
exports.auth = (0, auth_1.getAuth)(exports.app);
