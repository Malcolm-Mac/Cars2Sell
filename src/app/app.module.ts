import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as $ from 'jquery';
import { VehicleDetailsComponent } from './listings/vehicle-details/vehicle-details.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ListingsComponent } from './listings/listings.component';
import { FinanceCalculatorComponent } from './finance-calculator/finance-calculator.component';
import { HomeComponent } from './home/home.component';
import { SimilarCarsComponent } from './listings/similar-cars/similar-cars.component';
import { FaqComponent } from './faq/faq.component';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import * as xml2js from 'xml2js';
import { SearchingPipe } from './searching.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { HashLocationStrategy, LocationStrategy, Location, PathLocationStrategy } from '@angular/common';
import { DragScrollModule } from 'ngx-drag-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Buffer } from 'buffer';
import { FormsModule } from '@angular/forms';
import { DealerSignUpComponent } from './dealer-sign-up/dealer-sign-up.component';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { NoVehicleFoundComponent } from './no-vehicle-found/no-vehicle-found.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    ContactUsComponent,
    ListingsComponent,
    FinanceCalculatorComponent,
    HomeComponent,
    SimilarCarsComponent,
    FaqComponent,
    WhoWeAreComponent,
    HeaderComponent,
    FooterComponent,
    SearchingPipe,
    VehicleDetailsComponent,
    NoVehicleFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    DragScrollModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxJsonLdModule
  ],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
