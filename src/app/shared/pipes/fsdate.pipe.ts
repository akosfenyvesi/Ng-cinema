import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'fsdate'
})
export class FsdatePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(new Date(value * 1000), 'dd-MM-YYY HH:mm');
  }

}
