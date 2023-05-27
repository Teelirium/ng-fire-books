import { Pipe, PipeTransform } from '@angular/core';
import { sortBy } from 'lodash-es';

@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
  transform<T, K extends keyof T>(
    arr: T[],
    key: K,
    reverse: boolean = false
  ): T[] {
    const sorted = sortBy(arr, key);
    if (reverse) {
      sorted.reverse();
    }
    return sorted;
  }
}
