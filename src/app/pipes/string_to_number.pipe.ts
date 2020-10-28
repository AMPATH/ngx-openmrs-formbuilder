import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'str2num' })
export class Str2Num implements PipeTransform {
  transform(input: string): number {
    const num = parseFloat(input);
    if (num === 0.01) {
      return parseFloat('1.0');
    } else {
      return num + 0.1;
    }
  }
}
