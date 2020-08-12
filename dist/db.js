"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class Db {
    constructor(fileName, defaults = {}) {
        this.db = this;
        this.file = `./${fileName}`;
        if (!fs.existsSync(this.file))
            fs.writeFileSync(this.file, "{}");
        this.data = JSON.parse(fs.readFileSync(this.file, "utf-8"));
        for (let key of Object.keys(defaults)) {
            if (!this.data[key])
                this.data[key] = defaults[key];
        }
        this.store(false);
    }
    store(doDebounce = true) {
        if (this.storeDebounce) {
            clearTimeout(this.storeDebounce);
            delete this.storeDebounce;
        }
        this.storeDebounce = setTimeout(() => {
            fs.writeFileSync(this.file, JSON.stringify(this.data));
        }, doDebounce ? 15e3 : 0);
    }
    get(path, setFields = false) {
        path = Array.isArray(path) ? path : path.split(".");
        let value = path.reduce((p, c) => {
            if (p && !p[c] && setFields)
                p[c] = {};
            return (p && p[c]) ?? null;
        }, this.data);
        return value;
    }
    set(path, value) {
        path = Array.isArray(path) ? path : path.split(".");
        let final = path.pop();
        let field = this.get(path, true);
        field[final] = value;
    }
}
exports.default = Db;
//# sourceMappingURL=db.js.map