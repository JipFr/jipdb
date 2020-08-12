declare class Db {
    private db;
    private file;
    data: any;
    private storeDebounce;
    constructor(fileName: string, defaults?: any);
    store(doDebounce?: boolean): void;
    get(str: string, setFields?: boolean): any;
    set(str: string, value: any): void;
}
export default Db;
