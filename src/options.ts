
export interface IOptions {
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
   * Clear the cache before new builds.
   * This will also clear the generated
   * class name types defined in `mcss.d.ts`
   *
   * @default false
   */
  clean?: boolean;
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
   * Where the class name type declarations are stored
   *
   * @default 'types/mcss.d.ts'
   */
  typesDir?: string;
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
   * will be omited from obfuscation.
   *
   * @example [ 'row', 'col-' ]
   * @default []
   */
  ignore?: string[] | undefined;
}
