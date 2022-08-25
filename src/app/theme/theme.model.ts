import { ThemeMode } from "./theme.enum";

export type VariantPaletteProperties =
  | 'default'
  | '_50'
  | '_100'
  | '_200'
  | '_300'
  | '_400'
  | '_500'
  | '_600'
  | '_700'
  | '_800'
  | '_900'
  | 'A100'
  | 'A200'
  | 'A400'
  | 'A700';
export type OptionPalette = 'primary' | 'secondary' | 'danger';
export interface IPalette {
  primary: IVariantPalette;
  secondary: IVariantPalette;
  danger: IVariantPalette;
}

export interface IVariantPalette {
  default: string;
  _50: string;
  _100: string;
  _200: string;
  _300: string;
  _400: string;
  _500: string;
  _600: string;
  _700: string;
  _800: string;
  _900: string;
  A100: string;
  A200: string;
  A400: string;
  A700: string;
  contrast: {
    default: string;
    _50: string;
    _100: string;
    _200: string;
    _300: string;
    _400: string;
    _500: string;
    _600: string;
    _700: string;
    _800: string;
    _900: string;
    A100: string;
    A200: string;
    A400: string;
    A700: string;
  };
}

export class Theme {

  private themeMode!: ThemeMode;

  constructor(private _palette: IPalette){
  }

  setThemeMode(themeMode:ThemeMode){
    this.themeMode = themeMode;
  }

  public get getPalette(): IPalette {
    return this._palette;
  }
  public get getThemeMode(): ThemeMode {
    return this.themeMode;
  }
}