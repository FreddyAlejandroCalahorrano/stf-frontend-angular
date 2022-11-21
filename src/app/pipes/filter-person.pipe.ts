import {Persona} from '../components/personas/personas';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterPerson'
})
export class FilterPersonPipe implements PipeTransform {

  transform(array: Persona[], filter?: string): any {
    filter = filter.toUpperCase()
    if (!array || !filter) return array

    return array.filter(({lastName, name}) =>
      lastName.toUpperCase().includes(filter) || name.toUpperCase().includes(filter)
    );

  }
}
