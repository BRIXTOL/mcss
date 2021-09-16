import { IOptions, IObfuscateOptions } from './options';
import { Plugin as PostCSSPlugin } from 'postcss';
export declare function plugin(provided: Partial<IOptions>, defaults: any): any;
export declare function postcss(options?: IObfuscateOptions): PostCSSPlugin;
