"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordDev = void 0;
var auth_1 = require("firebase/auth");
var firebase_1 = require("./firebase");
var DiscordDev = /** @class */ (function () {
    function DiscordDev() {
    }
    DiscordDev.hashEncode = function (hash) {
        var data = hash
            .slice(1)
            .split("&")
            .map(function (row) { return row.split("="); })
            .reduce(function (data, _a) {
            var _b;
            var key = _a[0], value = _a[1];
            return Object.assign(data, (_b = {}, _b[key] = value, _b));
        }, {
            token_type: "",
            access_token: "",
            expires_in: "",
            scope: "",
        });
        return data;
    };
    DiscordDev.genURL = function () {
        if (!process.env.REACT_APP_DISCORD_ID) {
            throw new Error("REACT_APP_DISCORD_ID not found");
        }
        if (!process.env.REACT_APP_SITE_URL) {
            throw new Error("REACT_APP_SITE_URL not found");
        }
        // return `https://discord.com/api/oauth2/authorize?client_id=1045543753814909049&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=identify%20email`;
        return "https://discord.com/api/oauth2/authorize?client_id=".concat(process.env.REACT_APP_DISCORD_ID, "&redirect_uri=").concat(encodeURIComponent(window.location.origin + "/signin"), "&response_type=token&scope=identify%20email");
    };
    DiscordDev.signIn = function (token) {
        return new Promise(function (resolve, reject) {
            fetch("https://codey.okkc.in/api/discord/signin/".concat(token))
                .then(function (res) { return res.json(); })
                .then(function (res) {
                if (res.customToken) {
                    (0, auth_1.signInWithCustomToken)(firebase_1.auth, res.customToken).then(function (user) {
                        return resolve(user);
                    });
                }
                else {
                    throw new Error("Unknown Error");
                }
            })
                .catch(reject);
        });
    };
    return DiscordDev;
}());
exports.DiscordDev = DiscordDev;
