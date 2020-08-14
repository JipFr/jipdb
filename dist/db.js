"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Db = /** @class */ (function () {
    function Db(fileName, defaults) {
        if (defaults === void 0) { defaults = {}; }
        this.db = this;
        this.file = "./" + fileName;
        if (!fs.existsSync(this.file))
            fs.writeFileSync(this.file, "{}");
        this.data = JSON.parse(fs.readFileSync(this.file, "utf-8"));
        for (var _i = 0, _a = Object.keys(defaults); _i < _a.length; _i++) {
            var key = _a[_i];
            if (!this.data[key])
                this.data[key] = defaults[key];
        }
        this.store(false);
    }
    Db.prototype.store = function (doDebounce) {
        var _this = this;
        if (doDebounce === void 0) { doDebounce = true; }
        if (this.storeDebounce) {
            clearTimeout(this.storeDebounce);
            delete this.storeDebounce;
        }
        this.storeDebounce = setTimeout(function () {
            fs.writeFileSync(_this.file, JSON.stringify(_this.data));
        }, doDebounce ? 15e3 : 0);
    };
    Db.prototype.get = function (path, setFields) {
        if (setFields === void 0) { setFields = false; }
        path = Array.isArray(path) ? path : path.split(".");
        var value = path.reduce(function (p, c) {
            var _a;
            if (p && !p[c] && setFields)
                p[c] = {};
            return (_a = (p && p[c])) !== null && _a !== void 0 ? _a : null;
        }, this.data);
        return value;
    };
    Db.prototype.set = function (path, value) {
        path = Array.isArray(path) ? path : path.split(".");
        var final = path.pop();
        var field = this.get(path, true);
        field[final] = value;
        this.store();
    };
    return Db;
}());
exports.default = Db;
//# sourceMappingURL=db.js.map