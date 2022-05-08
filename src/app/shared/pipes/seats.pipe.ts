import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seats'
})
export class SeatsPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let temp = value.split('.');
    return (+temp[0] + 1) + ". row, " + (+temp[1] + 1) + ". seat.";
  }

}
