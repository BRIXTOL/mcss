import { Plugin } from 'rollup';
export interface IObfuscssOptions {
    input?: string;
    sourcemap?: boolean;
    generate?: boolean;
}
/**
 * @return {import('rollup').Plugin}
 */
export declare function obfuscss(options?: IObfuscssOptions): Plugin;
