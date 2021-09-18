import chalk from 'chalk';

/**
 * Plugin name
 *
 * All logs are prefixed with the plugin name
 */
const name = chalk.blueBright.bold('mcss');

/**
 * Action Log
 */
export const log = (message: string | string[]) => console.log(
  typeof message === 'string'
    ? chalk.blueBright(name, message)
    : chalk.white(chalk.gray('     -'), message.join(chalk.gray('\n     - ')))
);

/**
 * Info Logs
 */
export const info = (message: string) => console.info(
  chalk.gray(name, message)
);

/**
 * Warning Logs
 */
export const warn = (message: string) => console.warn(
  chalk.yellowBright(name, message)
);

/**
 * Error Logs
 */
export const error = (message: string, code?: string) => console.error(
  chalk`${name} {redBright ${message}}

    {red ${code}}

  `
);
