import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priorityImage',
})
export class PriorityImagePipe implements PipeTransform {

  constructor() {}

  transform(priority: string): string  {
    let url: string;
    switch (priority) {
      case 'low':
        url = './assets/iconos/chipsStatus/item-criticidad-4.svg';
        break
      case 'normal':
        url = './assets/iconos/chipsStatus/item-criticidad-3.svg';
        break
      case 'high':
        url = './assets/iconos/chipsStatus/item-criticidad-2.svg';
        break
    }
    if (url != '') {
      return url;
    }
    return '';
  }

}
