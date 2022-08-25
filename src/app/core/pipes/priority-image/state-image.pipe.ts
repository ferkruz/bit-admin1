import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateImage',
})
export class StateImagePipe implements PipeTransform {

  constructor() {}

  transform(state: string): string  {
    let url: string;
    switch (state) {
      case 'active':
        url = './assets/iconos/chipsTravel/status-en-curso.svg';
        break
      case 'unassigned':
        url = './assets/iconos/chipsTravel/status-no-asignado.svg';
        break
      case 'new':
        url = './assets/iconos/chipsTravel/status-nuevo.svg';
        break
      case 'rejected':
          url = './assets/iconos/chipsTravel/status-rechazado.svg';
          break
      case 'finished':
          url = './assets/iconos/chipsTravel/status-finalizada.svg';
          break
      case 'deleted':
        url = './assets/iconos/chipsTravel/status-rechazado.svg';
        break
    }
    if (url != '') {
      return url;
    }
    return '';
  }

}
