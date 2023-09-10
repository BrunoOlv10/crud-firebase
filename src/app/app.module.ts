import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
// import { environment } from 'src/environments/environment';

const firebaseConfig = {
    apiKey: "AIzaSyA6dgJcg0Sj_myZNJEsCD2vsvrYWc0WjSA",
    authDomain: "crud-firebase-d11c1.firebaseapp.com",
    projectId: "crud-firebase-d11c1",
    storageBucket: "crud-firebase-d11c1.appspot.com",
    messagingSenderId: "905340005490",
    appId: "1:905340005490:web:90773ad89deee39b4666eb"
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  AngularFireModule.initializeApp(firebaseConfig), AngularFirestoreModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
