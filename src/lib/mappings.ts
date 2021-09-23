
import { writeFile, writeJSON, readJSONSync } from 'fs-extra';
import { config } from './config';
import { error } from './log';

export interface IMaps { [className: string]: string }

const header_curried = (
  '/* eslint-disable */\n\n' +
  'import { Curries } from "@brixtol/mcss";\n\n' +
  'export type ClassNames = Array<\n'
);

const header_method = (
  '/* eslint-disable */\n\n' +
  'import { Selectors } from "@brixtol/mcss";\n\n' +
  'export type ClassNames = Array<\n'
);

const footer_curried = (
  '>;\n\n' +
  'declare module "mithril" {\n  ' +
  'interface Static extends Curries<ClassNames> {} \n}'
);

const footer_method = (
  '>;\n\n' +
  'declare module "mithril" {\n  ' +
  'interface Static { css: Selectors<ClassNames> }\n}'
);

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
  let file: string;

  const size: number = maps.length;

  for (; index < size; index++) types += '  | "' + maps[index] + '"\n';

  if (config.opts.selector === 'curried') {
    file = header_curried + types + footer_curried;
  } else {
    file = header_method + types + footer_method;
  }

  try {
    await writeFile(config.typesPath, file);
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
