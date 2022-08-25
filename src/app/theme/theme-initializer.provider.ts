import { APP_INITIALIZER } from "@angular/core";
import { ThemeMode } from "./theme.enum";
import { ThemeService } from "./theme.service";

export const ThemeInitializerProvider = {
  provide: APP_INITIALIZER,
  useFactory: (themeService: ThemeService): (() => void) =>
    () => {
      themeService.loadTheme(ThemeMode.LIGHT);
      return () => {};
    },
  deps: [ThemeService],
  multi: true
};