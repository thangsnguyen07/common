export declare class UtilService {
    getEnumValues<T>(enumObj: T): Array<T[keyof T]>;
    getEnumKeys<T>(enumObj: T): Array<keyof T>;
    arraysEqual<T>(...arrays: T[][]): boolean;
}
