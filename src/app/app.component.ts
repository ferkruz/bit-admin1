import { Component } from '@angular/core';

import { ThemeMode } from 'src/app/theme/theme.enum';
import { Theme } from 'src/app/theme/theme.model';
import { ThemeService } from 'src/app/theme/theme.service';

export interface TabItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Lazy-Loading-Mat-Tabs';

  tabs: TabItem[] = [
    {
      label: 'a cobrar',
      route: '/tocollect',
    },
    {
      label: 'a pagar',
      route: '/topay',
    },
    {
      label: 'anticipos',
      route: '/advance',
    },
        
  ];

  ThemeMode = ThemeMode
  temaSeleccionado: Theme

  constructor(private themeService: ThemeService) { 
    this.temaSeleccionado = this.themeService.getTheme()
  }

  ngOnInit(): void {
  }

  cambiarModoTema(themeMode: ThemeMode){
    this.themeService.cambiarModoTema(themeMode == ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK, themeMode);
  }
}