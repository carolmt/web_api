import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SpinnerInterceptor } from './Interceptors/spinner.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideClientHydration(), 
    provideHttpClient(withFetch(), 
    withInterceptors([SpinnerInterceptor])), 
    provideAnimationsAsync(), 
    provideAnimationsAsync()],
};

