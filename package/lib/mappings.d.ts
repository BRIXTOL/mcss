import { IConfig } from './options';
/**
 * Create a cache directory
 *
 * Creates a `.cache` within the `node_modules`
 * directory and a sub-directory named `mcss` its here
 * where the mapping JSON file lives.
 */
export declare const createCache: (path: string) => void;
export declare const readMaps: () => any;
/**
 * Generate mappings
 *
 * Creates css class name obfuscation mappings
 * and typescript declarations.
 */
export declare const generateMaps: (config: IConfig) => (css: string) => Promise<string>;
