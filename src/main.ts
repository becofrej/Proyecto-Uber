import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { defineCustomElements } from '@ionic/pwa-elements/loader';  // Importar PWA Elements

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

// Inicializar PWA Elements para que se puedan utilizar componentes como la cámara
defineCustomElements(window);