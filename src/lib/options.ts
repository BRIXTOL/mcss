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

export interface IRollupOptions {
  /**
   * Files to exclude (optional)
   *
   * @default []
   */
  include?: string[],
  /**
   * Files to exclude (optional)
   *
   * @default []
   */
  exclude?: string[],
  /**
   * Generate sourcemaps (optional)
   *
   * @default true
   */
  sourcemap?: boolean;
  /**
   * When true, obfuscation is applied (defaults to false)
   *
   * @default false
   */
  obfuscate?: boolean;
  /**
   * Where the cache class name maps are stored
   *
   * @default 'node_modules/.cache/mcss/.cssmap'
   */
  cacheDir?: string;
  /**
   * Where the class name type declarations are stored
   *
   * @default 'node_modules/@brixtol/mcss'
   */
  typesDir?: string;
}

export interface IConfig extends IRollupOptions {

  /**
   * PostCSS obfuscate options
   */
  options?: IObfuscateOptions
}
