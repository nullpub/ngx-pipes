import { Pipe, PipeTransform } from '@angular/core';
import { strOrArrayOfStr, typeOrArrayOfType } from '@loda/utils';
import { concat, orderBy } from 'lodash';

type SortDirections = 'desc' | 'asc';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  constructor() {}

  public transform<T>(
    value: T[] | ReadonlyArray<T>,
    props: string | string[],
    dirs: SortDirections | SortDirections[] = 'asc',
  ): T[] | ReadonlyArray<T> {
    // Kick back if not sorting an array
    if (!Array.isArray(value)) {
      console.warn(`The sort pipe requires an array. Instead, got a ${typeof value}.`);
      return value;
    }

    // Kick back if props isn't string or array of strings
    if (!strOrArrayOfStr(props)) {
      console.warn('The sort pipe requires string properties or an array of string properties.');
      return value;
    }

    // Kick back if dirs aren't 'asc' or 'desc'
    if (!typeOrArrayOfType(p => p === 'asc' || p === 'desc')(dirs)) {
      console.warn('The sort pipe requires asc or desc or an array of such for directions.');
      return value;
    }

    return orderBy(value, concat([], props), concat([], dirs));
  }
}
