
import * as fs from "fs";

class Db {
	
	private db: Db;
	private file: string;
	public data: any;
	private storeDebounce: any;

	constructor(fileName: string, defaults: any = {}) {
		this.db = this;

		this.file = `./${fileName}`;

		if(!fs.existsSync(this.file)) fs.writeFileSync(this.file, "{}");
		this.data = JSON.parse(fs.readFileSync(this.file, "utf-8"));

		for(let key of Object.keys(defaults)) {
			if(!this.data[key]) this.data[key] = defaults[key];
		}

		this.store();

	}

	public store(doDebounce = true) {
		if(this.storeDebounce) {
			clearTimeout(this.storeDebounce);
			delete this.storeDebounce;
		}
		this.storeDebounce = setTimeout(() => {
			fs.writeFileSync(this.file, JSON.stringify(this.data));
		}, doDebounce ? 15e3 : 0);	
	}

	public get(str: string, setFields = false) {
		let value = str.split(".").reduce((p, c)=> {
			if(p && !p[c] && setFields) p[c] = {};
			return (p && p[c]) ?? null;
		}, this.data);
		return value;
	}

	public set(str: string, value: any) {
		let field = this.get(str.split(".").slice(0, -1).join("."), true);
		field[str.split(".").pop()] = value;
	}
}

export default Db;