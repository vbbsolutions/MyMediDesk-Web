import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], HospitalLocation: string): any[] {
    if (!items) {
      return [];
    }
    if (!HospitalLocation) {
      return items;
    }
    HospitalLocation = HospitalLocation.toLocaleLowerCase();
    console.log(items);
    return items.filter(it => {
      return it.State.toLocaleLowerCase().includes(HospitalLocation);
    });
  }

}
