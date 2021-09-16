
import CSSShortener from 'css-shortener';
import { IConfig } from './options';
import { resolve } from 'path';
import { writeFile, createFileSync, existsSync, mkdirSync, readJsonSync } from 'fs-extra';
import { error } from './log';
import { cache, config } from './config';

/**
 * Create a cache directory
 *
 * Creates a `.cache` within the `node_modules`
 * directory and a sub-directory named `mcss` its here
 * where the mapping JSON file lives.
 */
export const createCache = (path: string) => {

  if (!existsSync(path)) {

    if (!existsSync(resolve('node_modules/.cache'))) {
      mkdirSync(resolve('node_modules/.cache'));
    } else {
      mkdirSync(resolve('node_modules/.cache/mcss'));
    }

    createFileSync(resolve(path));

  };

};

export const readMaps = () => readJsonSync(config.options.cacheDir);

/**
 * Generate Typings
 *
 * Creates type declarations of CSS class names and
 * write them to the `.cache` directory contained within
 * `node_modules` or a directory defined within options.
 */
const writeTypes = async (path: string) => {

  let types: string = 'export type ClassNames = Array<';

  const keys = Object.keys(cache.mappings);

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
const writeMaps = async (config: IConfig): Promise<void> => {

  try {
    await writeFile(config.cacheDir, JSON.stringify(cache.mappings, null, 2));
  } catch (e) {
    throw error(e);
  }

  return writeTypes(config.typesDir);

};

/**
 * Generate mappings
 *
 * Creates css class name obfuscation mappings
 * and typescript declarations.
 */
export const generateMaps = (config: IConfig) => {

  const obfuscate = new CSSShortener(config.options);

  return async (css: string): Promise<string> => {

    const styles = obfuscate.replaceCss(css);
    cache.mappings = obfuscate.getMap();

    await writeMaps(config);

    return config.obfuscate ? styles : css;

  };

  // log(stylesheet, maps);

};
