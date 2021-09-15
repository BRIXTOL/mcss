/**
 * Console Instance - Used for stdout and stderr
 */
export declare const log: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
}, error: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
};
