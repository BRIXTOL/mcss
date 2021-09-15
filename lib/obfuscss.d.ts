import { SCSSProcessor } from '../types/types';
/**
 * @param {string} css
 * @param {Scripts.SCSSProcessor} options
 */
export declare const CSSObfuscate: (css: string, options: SCSSProcessor) => Promise<string>;
/**
 * Class Map Match
 */
export declare const CSSMatch: (classMap: object) => (name: string) => string;
/**
 * @param {string} tag
 * @param {string} classes
 * @param {(name: string) => string} classMatch
 * @returns {string}
 */
export declare const CSSObfuscss: (tag: string, classes: string, match: (name: string) => string) => string;
/**
 */
export declare const CSSClasses: (tag: string, classes: string) => string;
/**
 */
export declare const processor: (options: SCSSProcessor) => (scss: string) => Promise<string>;
