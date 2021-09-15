import PostCSS, { Plugin, Root } from 'postcss';
import { generateMaps } from './mappings';
import { resolve } from 'path';

export interface IPathOptions {
  /**
   * Where the cache class name maps are stored
   *
   * @default 'node_modules/.cache/mcss/.cssmap'
   */
  mappings?: string,
  /**
   * Where the class name type declarations are stored
   *
   * @default 'node_modules/@brixtol/mcss/classes.d.ts'
   */
  typings?: string,
}

export interface IObfuscateOptions {
  /**
   * The alphabet is used to generate the new class names.
   * > _Note that there is no d in the default alphabet to
   *   avoid generation of the combination ad._
   *
   * @default 'abcefghijklmnopqrstuvwxyz0123456789_-'
   */
  alphabet?: string;
  /**
   * Classes starting with this prefix will be omited from replacing.
   * Set to `undefined` to disable.
   *
   * @default 'ignore-'
   */
  ignorePrefix?: string | undefined;
  /**
   * If true, the prefix will be trimmed off of the matched classes.
   *
   * @default true
   */
  trimIgnorePrefix?: boolean;
}

export interface IPostCSSPlugin {
  /**
   * When true, obfuscation is applied (defaults to false)
   */
  obfuscate?: boolean;
  /**
   * CSS Class name obfuscation options
   */
  options?: IObfuscateOptions;
  /**
   * Path locations for generated files
   */
  paths?: IPathOptions
}

export const postcss = (config: IPostCSSPlugin = {}): Plugin => {

  config = Object.assign({
    obfuscate: false,
    options: {},
    paths: {
      mappings: resolve('node_modules/.cache/mcss/.cssmap'),
      typings: resolve('node_modules/@brixtol/mcss/package/types/classes.d.ts')
    }
  }, config);

  const generate = generateMaps(config);

  return {
    postcssPlugin: 'postcss-mcss',
    async Once (root: Root, { result }) {
      const css = root.toString();
      const min = await generate(css);

      result.root = PostCSS.parse(min);
    }
  };
};
