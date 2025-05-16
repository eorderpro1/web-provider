import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'breakLines',     standalone: true,
  pure: true })
export class BreakLinesPipe implements PipeTransform {
  transform(value: string, interval: number = 10): string {
    if (!value) return '';
    return value.match(new RegExp(`.{1,${interval}}`, 'g'))?.join('<br>') ?? value;
  }
}