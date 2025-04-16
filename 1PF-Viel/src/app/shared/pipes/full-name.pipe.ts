import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName', 
  standalone: false

})
export class FullNamePipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): string {
    const result = value.name + ' ' + value.lastName;
    return args[0] === 'uppercase' ? result.toUpperCase() : result;
  }
}
