
import CSSShortener from 'css-shortener';
import { IPostCSSPlugin, IPathOptions } from './postcss';
import { resolve } from 'path';
import { writeFile, createFileSync, existsSync, mkdirSync, readFileSync } from 'fs-extra';
import { error } from './log';

/**
 * Class Maps
 *
 * Cache object which keeps an active reference of the
 * class name mappings.
 */
export let maps: { [className: string]: string };

/**
 * Create a cache directory
 *
 * Creates a `.cache` within the `node_modules`
 * directory and a sub-directory named `mcss` its here
 * where the mapping JSON file lives.
 */
const createCache = (path: string) => {

  if (!existsSync(path)) {

    if (!existsSync(resolve('node_modules/.cache'))) {
      mkdirSync(resolve('node_modules/.cache'));
    } else {
      mkdirSync(resolve('node_modules/.cache/mcss'));
    }

    createFileSync(resolve(path));

  };

};

/**
 * Generate Typings
 *
 * Creates type declarations of CSS class names and
 * write them to the `.cache` directory contained within
 * `node_modules` or a directory defined within options.
 */
const writeTypes = async (path: string) => {

  let types: string = 'export type ClassNames = Array<';
  const keys = Object.keys(maps);

  for (const id of keys) types += '| "' + id + '"';

  try {
    await writeFile(path, types + '\n>;');
  } catch (e) {
    throw error(e);
  }

};

/**
 * Write css class name mappings
 */
const writeMaps = async (path: IPathOptions): Promise<void> => {

  try {
    await writeFile(path.mappings, JSON.stringify(maps, null, 2));
  } catch (e) {
    throw error(e);
  }

  return writeTypes(path.typings);

};

/**
 * Generate mappings
 *
 * Creates css class name obfuscation mappings
 * and typescript declarations.
 */
export const generateMaps = (config: IPostCSSPlugin) => {

  console.log(config);
  createCache(config.paths.mappings);

  const obfuscate = new CSSShortener(config.options);

  if (typeof maps === 'undefined') {
    maps = {};
    maps = JSON.parse(readFileSync(config.paths.mappings).toString());

    console.log(maps);
  }

  return async (css: string): Promise<string> => {

    const styles = obfuscate.replaceCss(css);
    const newMap = obfuscate.getMap();

    Object.assign(maps, newMap);

    await writeMaps(config.paths);

    return config.obfuscate ? styles : css;

  };

  // log(stylesheet, maps);

};
