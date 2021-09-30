import { OptionsOutput as CleanCSSOptions } from 'clean-css';

export interface IOptions {
  /**
   * Files to exclude (optional)
   *
   * @default []
   */
  include?: string[];
  /**
   * Files to exclude (optional)
   *
   * @default []
   */
  exclude?: string[];
  /**
   * Clear the cache before new builds.
   *
   * @default false
   */
  clear?: boolean;
  /**
   * Warns about unknown class selectors.
   *
   * @default true
   */
  warnUnknown?: boolean;
  /**
   * Generate sourcemaps (optional)
   *
   * @default true
   */
  sourcemap?: boolean;
  /**
   * When true, mcss will apply minification to styles using
   * [clean-css](https://github.com/clean-css/clean-css). You
   * can pass cleancss options via the `cleancss` field.
   *
   * @default false
   */
  minify?: boolean;
  /**
   * Options for [clean-css](https://github.com/clean-css/clean-css).
   * When `minify` is `true` stylesheets will be minified using
   * cleancss.
   *
   * ---
   *
   * **IMPORTANT**
   *
   * The `minify` options must be set to `true` in order for
   * mcss to process minification.
   *
   * @default false
   */
  cleancss?: CleanCSSOptions;
  /**
   * When true, obfuscation is applied (defaults to false)
   *
   * @default false
   */
  obfuscate?: boolean;
  /**
   * Where the cache class name maps are stored.
   * By default they are placed within the `.cache` directory
   * of the `node_modules` using the filename `.cssmap`.
   *
   * @default 'node_modules/.cache/mcss'
   */
  cacheDir?: string;
  /**
   * Generates a declaration file.
   *
   * @default 'types/mcss/selectors.d.ts'
   */
  declaration?: string;
  /**
   * The alphabet is used to generate the new class names.
   * > _Note that there is no `d` in the default alphabet to
   *   avoid generation of the combination ad._
   *
   * @default 'abcefghijklmnopqrstuvwxyz0123456789'
   */
   alphabet?: string;
   /**
   * A list of classes starting with this prefix or matching
   * will be omitted from obfuscation.
   *
   * @example [ 'row', 'col-' ]
   * @default []
   */
  ignore?: string[] | undefined;
}
