import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform<T>(arr: T[], reverse: boolean = false) {
    arr.sort();
    if (reverse) {
      arr.reverse();
    }
    return arr;
  }
}
