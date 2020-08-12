declare class Db {
    private db;
    private file;
    data: any;
    private storeDebounce;
    constructor(fileName: string, defaults?: any);
    store(doDebounce?: boolean): void;
    get(path: string | any[], setFields?: boolean): any;
    set(path: string | any[], value: any): void;
}
export default Db;
