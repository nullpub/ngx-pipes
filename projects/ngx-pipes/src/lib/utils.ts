/**
 * A simple function to wrap try/catch so it can be optimized.
 *
 * returns [error | undefined, value | undefined] tuple
 */
export const tryCatch = <O>(i: () => O): [Error | undefined, O | undefined] => {
  try {
    return [undefined, i()];
  } catch (e) {
    return [e, undefined];
  }
};
