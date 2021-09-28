import { join, resolve } from 'path';
import { Plugin } from 'rollup';
import { ensureFileSync, removeSync } from 'fs-extra';
import { readMapCache, IMaps } from './mappings';
import { config } from './config';
import { IOptions } from '../options';
import { rollup } from './rollup';
import { log, warn } from './log';

export function plugin (provided: IOptions): Plugin {

  const cwd = process.cwd().length + 1;

  for (const p in provided) {
    if (!(p in config.opts)) throw new Error('No such option ' + p);

    config.opts[p] = (p === 'cacheDir' || p === 'declaration')
      ? resolve(provided[p])
      : provided[p];

  }

  config.mcss = true;
  config.cachePath = join(config.opts.cacheDir, '.cssmap');
  config.typeCache = join(config.opts.cacheDir, '.typemap');

  ensureFileSync(config.cachePath);

  config.ignoredClasses = config.opts.ignore.length > 0
    ? new RegExp(config.opts.ignore.join('|'))
    : false;

  if (config.opts.clean) {

    removeSync(config.opts.cacheDir);

    setTimeout(() => {
      warn('Clearing existing references...');
      log([ config.cachePath.slice(cwd), config.opts.declaration.slice(cwd) ]);
    }, 5);

  }

  ensureFileSync(config.cachePath);
  ensureFileSync(config.typeCache);
  ensureFileSync(config.opts.declaration);

  if (config.opts.obfuscate) {
    if (!config.maps) {
      config.maps = readMapCache(config.cachePath) as IMaps;
    }
  }

  if (!config.types) {
    config.types = new Set(readMapCache(config.typeCache) as string[]);
    if (config.types.size > 0) config.postcss = true;
  }

  return rollup();

};
