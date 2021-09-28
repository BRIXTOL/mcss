
import { writeFile, writeJSON, readJSONSync } from 'fs-extra';
import { config } from './config';
import { error } from './log';

export interface IMaps { [className: string]: string }

/**
 * Generate Typings
 *
 * Creates type declarations of CSS class names and
 * write them to the `.cache` directory contained within
 * `node_modules` or a directory defined within options.
 */
export async function writeTypes (maps: string[]) {

  let types: string = '';
  let index: number = 0;

  const size: number = maps.length;

  for (; index < size; index++) types += '  | "' + maps[index] + '"\n';

  const file = (
    '/* eslint-disable */\n' +
    'import { Fugazi } from "@brixtol/mcss";\n\n' +
    '/**\n * CSS Class Selectors \n * \n ' +
    '* Last Modified: ' + new Date().toISOString() + '\n */\n' +
    'declare type Selectors = Array<\n' + types + '>;\n\n' +
    'declare module "mithril" { interface Static extends Fugazi<Selectors> {} }'
  );

  try {
    await writeFile(config.opts.declaration, file);
    await writeJSON(config.typeCache, maps);
  } catch (e) {
    throw error('Error occured when writing types', e.message);
  }

};

/**
 * Write css class name mappings
 */
export async function writeMaps (maps: IMaps): Promise<void> {

  try {
    await writeJSON(config.cachePath, maps);
  } catch (e) {
    throw error('Error occured when writing class maps', e.message);
  }

};

/**
 * Read the class cache map
 */
export function readMapCache (path: string): IMaps | string[] {

  try {
    return readJSONSync(path, { throws: true });
  } catch (e) {
    return path === config.typeCache ? [] : {};
  };

}
