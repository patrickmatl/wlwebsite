/**
 * DUPLICATE CONFIG — intentionally a re-export.
 *
 * Next.js loads next.config.js first, so that file is the single real config.
 * This file used to hold a SECOND, different config (different image and
 * compiler settings), which made it ambiguous which settings were active.
 * It now simply re-exports the real one. Safe to delete.
 */
import config from './next.config.js';

export default config;
