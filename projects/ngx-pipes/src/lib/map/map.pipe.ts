import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'lodash';

import { tryCatch } from '../utils';

@Pipe({
  name: 'map'
})
export class MapPipe implements PipeTransform {
  constructor() {}

  public transform<T, D>(
    value: T | T[],
    iteratee: (t: T) => D
  ): D | D[] | T | T[] {
    // Kick back if predicate is not a function
    if (typeof iteratee !== 'function') {
      console.warn(
        `The map pipe requires a function as its iteratee. Instead, got a ${typeof iteratee}`
      );
      return value;
    }

    // External tryCatch for optimization
    const [error, output] = tryCatch(() =>
      Array.isArray(value) ? map(value, iteratee) : iteratee(value)
    );

    // Return mapped value if no error is thrown
    if (error === undefined) {
      return output as D | D[]; // This is a workaround for casting unknown to the iteratee output
    }

    // Log an error and return the original value if map failed
    console.error(
      'An error was caught in a map pipe. The map pipe is returning the original value.',
      error
    );
    return value;
  }
}
