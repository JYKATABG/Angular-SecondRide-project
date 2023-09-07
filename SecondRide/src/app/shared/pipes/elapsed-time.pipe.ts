import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'elapsedTime',
})
export class ElapsedTimePipe implements PipeTransform {
  transform(dateString: Date | undefined, ...args: unknown[]): unknown {
    return moment(dateString).format('LL');
  }
}
