import { Console } from 'console';

/**
 * Console Instance - Used for stdout and stderr
 */
export const { log, error, warn } = new Console({
  stdout: process.stdout,
  stderr: process.stderr
});
