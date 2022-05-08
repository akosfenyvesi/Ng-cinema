import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ceil'
})
export class CeilPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): number {
    return Math.ceil(value);
  }

}
