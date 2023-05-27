import { Pipe, PipeTransform } from '@angular/core';
import { groupBy } from 'lodash-es';

@Pipe({
  name: 'groupBy',
})
export class GroupByPipe implements PipeTransform {
  transform<T, K extends keyof T>(array: T[], key: K): [T[K], T[]][] {
    const dict = groupBy(array, key);
    const entries = Object.entries(dict).map(([k, v]) => [
      JSON.parse(k),
      v,
    ]) satisfies [T[K], T[]][];
    return entries;
  }
}
