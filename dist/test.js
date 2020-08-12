"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
let db = new index_1.default("data.json", {
    teachers: [],
    students: []
});
let someKey = "some-key";
db.set("main.hello.test", "This works too lmaoooo");
db.set(["main", "hello", someKey], 123);
console.log(db.data);
//# sourceMappingURL=test.js.map