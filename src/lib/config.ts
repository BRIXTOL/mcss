/* eslint-disable no-use-before-define */

import { resolve } from 'path';
import { IOptions } from '../options';
import { IMaps } from './mappings';

/**
 * Default Configuration
 *
 * This is a global object that is is used across
 * the module. It's a mutable state object, which holds
 * a reference of the plugin options plus internal
 */
export const config: IConfig = {
  mcss: true,
  postcss: false,
  ignoredClasses: false,
  isRebuild: false,
  cachePath: '',
  typesPath: '',
  typeCache: '',
  maps: null,
  types: null,
  unknown: new Set(),
  opts: {
    selector: 'curried',
    include: [],
    exclude: [],
    sourcemap: true,
    obfuscate: false,
    clean: false,
    warnUnknown: true,
    cacheDir: resolve('node_modules/.cache/mcss'),
    typesDir: resolve('types'),
    alphabet: 'abcefghijklmnopqrstuvwxyz0123456789',
    ignore: []
  }
};

export const tags = new Set([
  'a'
  , 'abbr'
  , 'acronym'
  , 'address'
  , 'applet'
  , 'area'
  , 'article'
  , 'aside'
  , 'audio'
  , 'b'
  , 'base'
  , 'basefont'
  , 'bdi'
  , 'bdo'
  , 'bgsound'
  , 'big'
  , 'blink'
  , 'blockquote'
  , 'body'
  , 'br'
  , 'button'
  , 'canvas'
  , 'caption'
  , 'center'
  , 'cite'
  , 'class'
  , 'code'
  , 'col'
  , 'colgroup'
  , 'command'
  , 'content'
  , 'data'
  , 'datalist'
  , 'dd'
  , 'del'
  , 'details'
  , 'dfn'
  , 'dialog'
  , 'dir'
  , 'div'
  , 'dl'
  , 'dt'
  , 'element'
  , 'em'
  , 'embed'
  , 'fieldset'
  , 'figcaption'
  , 'figure'
  , 'font'
  , 'footer'
  , 'form'
  , 'frame'
  , 'frameset'
  , 'h1'
  , 'h2'
  , 'h3'
  , 'h4'
  , 'h5'
  , 'h6'
  , 'head'
  , 'header'
  , 'hgroup'
  , 'hr'
  , 'html'
  , 'i'
  , 'iframe'
  , 'image'
  , 'img'
  , 'input'
  , 'ins'
  , 'isindex'
  , 'kbd'
  , 'keygen'
  , 'label'
  , 'legend'
  , 'li'
  , 'link'
  , 'listing'
  , 'main'
  , 'map'
  , 'mark'
  , 'marquee'
  , 'math'
  , 'menu'
  , 'menuitem'
  , 'meta'
  , 'meter'
  , 'multicol'
  , 'nav'
  , 'nextid'
  , 'nobr'
  , 'noembed'
  , 'noframes'
  , 'noscript'
  , 'object'
  , 'ol'
  , 'optgroup'
  , 'option'
  , 'output'
  , 'p'
  , 'param'
  , 'picture'
  , 'plaintext'
  , 'pre'
  , 'progress'
  , 'q'
  , 'rb'
  , 'rbc'
  , 'rp'
  , 'rt'
  , 'rtc'
  , 'ruby'
  , 's'
  , 'samp'
  , 'script'
  , 'section'
  , 'select'
  , 'shadow'
  , 'slot'
  , 'small'
  , 'source'
  , 'spacer'
  , 'span'
  , 'strike'
  , 'strong'
  , 'style'
  , 'sub'
  , 'summary'
  , 'sup'
  , 'svg'
  , 'table'
  , 'tbody'
  , 'td'
  , 'template'
  , 'textarea'
  , 'tfoot'
  , 'th'
  , 'thead'
  , 'time'
  , 'title'
  , 'tr'
  , 'track'
  , 'tt'
  , 'u'
  , 'ul'
  , 'var'
  , 'video'
  , 'wbr'
  , 'xmp'
]);

export interface IConfig {
  /**
   * Holds the defined options for the plugin.
   */
  opts: IOptions;
  /**
   * Whether or not a rebuild is being executed
   */
  isRebuild: boolean;
  /**
   * Holds the cache reference of the CSS class name
   * mappings. This is populated when `obfuscate` is
   * set to `true`
   */
  maps: IMaps;
  /**
   * Holds the a string list reference of class names.
   * When obfuscation option is `false` then we only generate
   * typings and this keeps track of all types we are writing.
   */
  types: Set<string>;
  /**
   * Holds the a string list reference of unknown class name
   * selectors.
   */
  unknown: Set<string>;
  /**
   * Whether or not the mcss plugin has been called
   */
  mcss: boolean;
  /**
   * A regular expression generated from the `ignore`
   * option which is used to exclude certain classes
   * when obfucating.
   */
  ignoredClasses: RegExp | false;
  /**
   * Whether or not postcss has processed the stylesheets.
   * This determines if we have class mappings available or
   * if they still need to be generated.
   */
  postcss: boolean;
  /**
   * Typings path, this the absolute path to where the
   * type declarations will be written of class names
   */
  typesPath: string;
  /**
   * Typings cache path, this is the absolute path
   * to a cache reference of the class names as string list
   * will be written.
   */
  typeCache: string;
  /**
   * Cache path, the absolute path to the mappings cache which
   * holds a reference to obufscated class name maps. This is
   * where the class names maps will be written.
   */
  cachePath: string;
}
