import { resolve } from 'path';
import { IRollupOptions, IObfuscateOptions } from './options';

export const cache = {
  mappings: {},
  stylesheets: {}
};

export const config = {
  available: {
    mcss: false,
    postcss: false
  },
  options: <IRollupOptions> {
    include: [],
    exclude: [],
    sourcemap: true,
    obfuscate: false,
    cacheDir: resolve('node_modules/.cache/mcss/.cssmap'),
    typesDir: resolve('node_modules/@brixtol/mcss/package/types/classes.d.ts'),
    options: <IObfuscateOptions> {}
  }
};
