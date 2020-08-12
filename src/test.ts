import Database from "./index";

let db = new Database("data.json", {
	teachers: [],
	students: []
})

db.set("main.hello.test", "This works too lmaoooo");
console.log(db.data);