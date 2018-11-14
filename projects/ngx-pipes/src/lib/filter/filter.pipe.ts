import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'lodash';

import { tryCatch } from '../utils';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  constructor() {}

  public transform<T>(
    value: T[] | ReadonlyArray<T>,
    predicate: (t: T) => boolean = _ => true
  ): T[] | ReadonlyArray<T> {
    // Kick back if not sorting an array
    if (!Array.isArray(value)) {
      console.warn(
        `The filter pipe requires an array. Instead, got a ${typeof value}.`
      );
      return value;
    }

    // Kick back if predicate is not a function
    if (typeof predicate !== 'function') {
      console.warn(
        `The filter pipe requires a function as its predicate. Instead, got a ${typeof predicate}.`
      );
      return value;
    }

    // External tryCatch for optimization
    const [error, output] = tryCatch<T[]>(() => filter<T[]>(value, predicate));

    // Return mapped value if no error is thrown
    if (error === undefined) {
      return output as T[]; // This is a workaround for casting unknown to the iteratee output
    }

    console.error(
      'The filter pipe threw an error while attempting to filter, returning original value.',
      error
    );
    return value;
  }
}
