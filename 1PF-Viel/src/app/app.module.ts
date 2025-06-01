import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './featured/dashboard/home/home.component';
import { DashboardModule } from './featured/dashboard/dashboard.module';
import { AuthModule } from './featured/auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    DashboardModule,
    AuthModule, HttpClientModule, StoreModule.forRoot({}, {}), StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }), EffectsModule.forRoot([])
  ],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
