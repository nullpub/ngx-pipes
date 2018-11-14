import { Pipe, PipeTransform } from '@angular/core';
import { find } from 'lodash';

@Pipe({
  name: 'find'
})
export class FindPipe implements PipeTransform {
  constructor() {}

  public transform<T>(
    value: T[] | ReadonlyArray<T>,
    predicate: (t: T) => boolean = _ => true,
    def?: T
  ): T | undefined {
    // Kick back if not sorting an array
    if (!Array.isArray(value)) {
      console.warn(
        `The find pipe requires an array. Instead, got a ${typeof value}.`
      );
      return undefined;
    }

    // Kick back if predicate is not a function
    if (typeof predicate !== 'function') {
      console.warn(
        `The find pipe requires a function as its predicate. Instead, got a ${typeof predicate}`
      );
      return undefined;
    }

    const output = find(value, predicate);

    return output === undefined ? def : output;
  }
}
