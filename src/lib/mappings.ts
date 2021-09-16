
import CSSShortener from 'css-shortener';
import { IConfig } from './options';
import { writeFile, readJsonSync } from 'fs-extra';
import { error } from './log';
import { cache, config } from './config';

export const readMaps = () => readJsonSync(config.options.cache);

/**
 * Generate Typings
 *
 * Creates type declarations of CSS class names and
 * write them to the `.cache` directory contained within
 * `node_modules` or a directory defined within options.
 */
const writeTypes = async (path: string) => {

  let types: string = (
    '/* eslint-disable */\n\n' +
    'import { Selectors } from "@brixtol/mcss";\n\n' +
    'export type ClassNames = Array<\n  '
  );

  const keys = Object.keys(cache.mappings);

  for (const id of keys) types += '| "' + id + '"\n  ';

  types += '>;\n\n'.trimStart();
  types += 'declare module "mithril" {\n';
  types += '  export interface Static { css: Selectors<ClassNames> }\n}';

  try {
    await writeFile(path, types);
  } catch (e) {
    throw error(e);
  }

};

/**
 * Write css class name mappings
 */
const writeMaps = async (config: IConfig): Promise<void> => {

  try {
    await writeFile(config.cache, JSON.stringify(cache.mappings, null, 2));
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
