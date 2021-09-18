import { join, resolve } from 'path';
import { Plugin } from 'rollup';
import { ensureDirSync, ensureFileSync, removeSync } from 'fs-extra';
import { readMapCache, IMaps } from './mappings';
import { config } from './config';
import { IOptions } from '../options';
import { rollup } from './rollup';
import { log, warn } from './log';

export function plugin (provided: IOptions): Plugin {

  for (const p in provided) {
    if (!(p in config.opts)) throw new Error('No such option ' + p);
    config.opts[p] = (p === 'cacheDir' || p === 'typesDir')
      ? resolve(provided[p])
      : provided[p];
  }

  config.mcss = true;
  config.cachePath = join(config.opts.cacheDir, '.cssmap');
  config.typeCache = join(config.opts.cacheDir, '.typemap');
  config.typesPath = join(config.opts.typesDir, 'mcss.d.ts');
  config.ignoredClasses = config.opts.ignore.length > 0
    ? new RegExp(config.opts.ignore.join('|'))
    : false;

  if (config.opts.clean) {

    const cwd = process.cwd().length + 1;

    removeSync(config.opts.cacheDir);
    removeSync(config.typesPath);

    setTimeout(() => {
      warn('Clearing existing references...');
      log([ config.cachePath.slice(cwd), config.typesPath.slice(cwd) ]);
    }, 5);
    // console.log('exists', existsSync(config.opts.cacheDir));

  }

  ensureFileSync(config.cachePath);
  ensureFileSync(config.typeCache);
  ensureDirSync(config.opts.typesDir);

  if (config.opts.obfuscate) {
    if (!config.maps) {
      config.maps = readMapCache(config.cachePath) as IMaps;
    }
  }

  if (!config.types) {
    config.types = new Set(readMapCache(config.typeCache) as string[]);
    if (config.types.size > 0) config.postcss = true;
  }

  // console.log(config);

  return rollup();

};
