import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from "./app.material-module";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToCollectComponent } from './to-collect/to-collect.component';
import { ThemeInitializerProvider } from './theme/theme-initializer.provider';

@NgModule({
  declarations: [
    AppComponent,
    ToCollectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
  ],
  providers: [ThemeInitializerProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
