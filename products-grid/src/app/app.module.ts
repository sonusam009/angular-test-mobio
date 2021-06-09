import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';

import { HttpClientModule } from '@angular/common/http';
import { ProductsServiceService } from './products-service.service';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ProductsServiceService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
