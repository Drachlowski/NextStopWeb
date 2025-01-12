import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LOCALE_ID } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { OAuthModule, provideOAuthClient } from 'angular-oauth2-oidc';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

registerLocaleData(localeDe);

export const CUSTOM_DATE_FORMATS = {
  parse: { dateInput: 'DD.MM.YYYY' },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    provideOAuthClient(),
    provideClientHydration(withEventReplay()),
    { provide: LOCALE_ID, useValue: 'de-DE' },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
     provideAnimationsAsync()]
};
