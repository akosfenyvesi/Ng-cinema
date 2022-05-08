import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateConvert'
})
export class DateConvertPipe implements PipeTransform {

  transform(date?: Date, ...args: unknown[]): unknown {
    return (date?.getMonth() as number + 1) + "-" + (date?.getDate() as number);
  }

}
