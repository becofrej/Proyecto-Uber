import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// ======== Firebase ========
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot({mode: 'md'}), 
    AppRoutingModule,     
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    AngularFireModule,
    AngularFireAuthModule,AngularFireModule.initializeApp(environment.firebaseConfig)],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideAnimationsAsync(), provideHttpClient(), provideFirebaseApp(() => initializeApp({"projectId":"tellevoapp-duoc-d6cd2","appId":"1:537205520709:web:ac88b485910e9ef649e62c","storageBucket":"tellevoapp-duoc-d6cd2.appspot.com","apiKey":"AIzaSyDb4-RBeaUWEvUE5rMkuRgaFevY9pZo1MY","authDomain":"tellevoapp-duoc-d6cd2.firebaseapp.com","messagingSenderId":"537205520709"})), provideAuth(() => getAuth())],
  bootstrap: [AppComponent],
})
export class AppModule {}