import Database from "./index";

let db = new Database("data.json", {
	teachers: [],
	students: []
})

let someKey = "some-key";

db.set("main.hello.test", "This works too lmaoooo");
db.set(["main", "hello", someKey], 123);
console.log(db.data);