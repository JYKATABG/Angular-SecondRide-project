import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';
import { AboutComponent } from './layouts/about/about.component';
import { ContactUsComponent } from './layouts/contact-us/contact-us.component';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { OffersCatalogComponent } from './offers-catalog/offers-catalog.component';
import { OfferModule } from './offer/offer.module';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactUsComponent,
    NotFoundComponent,
    OffersCatalogComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    UserModule,
    OfferModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
