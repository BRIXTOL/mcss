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
    cache: resolve('node_modules/.cache/mcss/.cssmap'),
    typesDir: resolve('types'),
    options: <IObfuscateOptions> {}
  }
};
