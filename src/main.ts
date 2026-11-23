import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import 'hammerjs';

if (environment.production) {
  enableProdMode();
}

function bootstrap(): void {
  platformBrowserDynamic().bootstrapModule(AppModule).catch(error => {
    console.error('No se pudo iniciar la aplicación:', error);
    const root = document.querySelector('app-root');
    if (root) {
      root.textContent = 'No se pudo iniciar la aplicación. Recarga la página y revisa la consola del navegador si el problema continúa.';
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
