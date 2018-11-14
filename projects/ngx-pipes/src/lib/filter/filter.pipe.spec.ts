import { filter } from 'lodash';

import { FilterPipe } from './filter.pipe';

const mod = (n: number, m: number): number => ((n % m) + m) % m;
const list = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

describe('Pipe: Filter', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  afterEach(() => {
    pipe = null;
  });

  // Happy Path
  it('should filter a list', () => {
    const pred = (n: number) => mod(n, 2) === 0;
    expect(pipe.transform(list, pred)).toEqual(filter(list, pred));
  });

  // Bad Inputs
  it('should return the input value when input is not list', () => {
    // @ts-ignore
    expect(pipe.transform('a', 'a')).toEqual('a');
  });

  it('should return the original list on bad predicate', () => {
    // @ts-ignore
    expect(pipe.transform(list, 'a')).toEqual(list);
  });

  // Correct input types but predicate throws
  it('should return the original list when the predicate throws', () => {
    expect(
      pipe.transform(list, () => {
        throw new Error('Oops');
      })
    ).toEqual(list);
  });
});
