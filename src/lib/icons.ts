import { readdirSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { extname, resolve, basename } from 'path';
import chalk from 'chalk';

const { log } = console;

/**
 * `/src/svg/generated`
 */
const ICON_GEN = resolve(process.cwd(), './src/svg');

if (!existsSync(ICON_GEN)) mkdirSync(ICON_GEN);

/**
 * `/src/svg/generated`
 */
const SVG_TYPES = resolve(process.cwd(), './types');

/**
 * `/icons/*.svg`
 */
const SVGS_DIR = resolve(process.cwd(), './src/svg/files');

/**
 * Build Custom Icon Exports
 */
function buildCustomIcons (svgFiles: string[]) {

  let def = 'export type Icons =\n';

  log(chalk`\n{white.bold Custom Icons}`);

  def = def + svgFiles.map((svg, i) => {

    const name = basename(svg, '.svg');

    log(chalk`  - {magentaBright ${name}}`);

    const semi = i === (svgFiles.length - 1) ? ';' : '\n';

    return `  | "${name}"${semi}`;

  }).join('');

  def = def + '\n\nexport as namespace SVGIconNames;';

  // LOG
  log(chalk`\n{green Generated {greenBright ${svgFiles.length}} files}`);

  return def;

}

/* -------------------------------------------- */
/*                  WRITE FILES                 */
/* -------------------------------------------- */

const svgFiles = readdirSync(SVGS_DIR).filter(file => extname(file) === '.svg');
const typeDefs = buildCustomIcons(svgFiles);

// LOG
log(chalk`\n{white.bold TypeScript Files}`);

// SVGS
writeFileSync(SVG_TYPES + '/icons.d.ts', typeDefs);

log(chalk`\n{greenBright Generated {bold ${typeDefs.length + 3}} definitions}\n`);
