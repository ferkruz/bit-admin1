import { Injectable } from '@angular/core';
import { ThemeMode } from './theme.enum';
import { IPalette, IVariantPalette, OptionPalette, Theme, VariantPaletteProperties } from './theme.model';

const PALETTE : IPalette = {
  primary:{
    default: '#ff7b13',
    '_50': '#ffefe3',
    '_100': '#ffd7b8',
    '_200': '#ffbd89',
    '_300': '#ffa35a',
    '_400': '#ff8f36',
    '_500': '#ff7b13',
    '_600': '#ff7311',
    '_700': '#ff680e',
    '_800': '#ff5e0b',
    '_900': '#ff4b06',
    A100: '#ffffff',
    A200: '#fff6f3',
    A400: '#ffcfc0',
    A700: '#ffbba7',

    contrast : {
      default: '#bf690f',
      _50: '#000000de',
      _100: '#000000de',
      _200: '#000000de',
      _300: '#000000de',
      _400: '#000000de',
      _500: 'white',
      _600: 'white',
      _700: 'white',
      _800: 'white',
      _900: 'white',
      A100: '#000000de',
      A200: '#000000de',
      A400: '#000000de',
      A700: '#000000de'
    }
  },
  secondary:{
    default: '#2668a6',
    '_50': '#e5edf4',
    '_100': '#bed2e4',
    '_200': '#93b4d3',
    '_300': '#6795c1',
    '_400': '#477fb3',
    '_500': '#2668a6',
    '_600': '#22609e',
    '_700': '#1c5595',
    '_800': '#174b8b',
    '_900': '#0d3a7b',
    A100: '#adcaff',
    A200: '#7aa9ff',
    A400: '#4789ff',
    A700: '#2d78ff',
    contrast : {
      default: '#bf690f',
      _50: '#000000de',
      _100: '#000000de',
      _200: '#000000de',
      _300: '#000000de',
      _400: '#000000de',
      _500: 'white',
      _600: 'white',
      _700: 'white',
      _800: 'white',
      _900: 'white',
      A100: '#000000de',
      A200: '#000000de',
      A400: '#000000de',
      A700: '#000000de'
    }
  },
  danger: {
    default: '#ef4444',
    _50: '#ffffff',
    _100: '#fef2f2',
    _200: '#f9bebe',
    _300: '#f47c7c',
    _400: '#f16060',
    _500: '#ef4444',
    _600: '#ed2828',
    _700: '#e21313',
    _800: '#c61111',
    _900: '#aa0f0f',
    A100: '#ffffff',
    A200: '#ffcdcd',
    A400: '#fe6868',
    A700: '#f55757',
    contrast: {
      default: 'white',
      _50: '#000000de',
      _100: '#000000de',
      _200: '#000000de',
      _300: '#000000de',
      _400: '#000000de',
      _500: 'white',
      _600: 'white',
      _700: 'white',
      _800: 'white',
      _900: 'white',
      A100: '#000000de',
      A200: '#000000de',
      A400: '#000000de',
      A700: '#000000de'
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private theme = new Theme(PALETTE);

  constructor() {
  }

  getTheme(){
    return this.theme
  }

  cambiarModoTema(modoThema: ThemeMode, modoTemaAnterior: ThemeMode){
    this.theme.setThemeMode(modoThema);
    this.loadTheme(modoThema, modoTemaAnterior)
  }

  private setPaletteColorsCSS(palette: IPalette): void {
    for (const key in palette) {
      if (Object.prototype.hasOwnProperty.call(palette, key)) {
        const parseKey = key as OptionPalette;
        this.setCSSVariables(key, palette[parseKey]);
      }
    }
  }

  private setCSSVariables(key: string, palette: IVariantPalette) {
    for (const keyPalette in palette) {
      if (Object.prototype.hasOwnProperty.call(palette, keyPalette)) {
        if (keyPalette == 'contrast') {
          for (const keyContrast in palette.contrast) {
            if (Object.prototype.hasOwnProperty.call(palette.contrast, keyContrast)) {
              const parseKey = keyContrast as VariantPaletteProperties;
              document.documentElement.style.setProperty(
                '--theme-' + [key] + '-contrast-' + keyContrast.replace('_', ''),
                palette.contrast[parseKey]
              );
            }
          }
        } else {
          const parseKey = keyPalette as VariantPaletteProperties;
          document.documentElement.style.setProperty(
            '--theme-' + [key] + '-' + keyPalette.replace('_', ''),
            palette[parseKey]
          );
        }
      }
    }
  }

  private removeUnusedTheme(themeMode: ThemeMode | null): void {
    if (themeMode) {
      document.body.classList.remove(themeMode);
    }
  }

  public loadTheme(
    themeMode: ThemeMode,
    oldThemeMode: ThemeMode | null = null,
    firstLoad: boolean = true
  ): void {
    if (firstLoad) {
      document.body.classList.add(themeMode);
      this.setPaletteColorsCSS(this.theme.getPalette);
    }
    this.theme.setThemeMode(themeMode)
    document.body.classList.add(themeMode);
    if(oldThemeMode)this.removeUnusedTheme(oldThemeMode);
  }
}
