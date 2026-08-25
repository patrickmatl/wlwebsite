/**
 * DUPLICATE CONFIG — intentionally a re-export.
 *
 * Next.js loads next.config.js first, so that file is the single real config.
 * This file used to hold a third, empty config. It now re-exports the real
 * one. Safe to delete.
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./next.config.js');

export default config;
