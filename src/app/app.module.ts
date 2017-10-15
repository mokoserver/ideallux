import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {AppRoutes} from "./app.routing";
import { CatalogComponent } from './body/catalog/catalog.component';
import { ProductListComponent } from './body/product-list/product-list.component';
import { ProductListCatalogComponent } from './body/product-list/product-list-catalog/product-list-catalog.component';
import {HttpService} from "./http.service";
import {HttpClientModule} from "@angular/common/http";
import {AuthenticationService} from "./autentication.service";
import {MatPaginatorModule} from "@angular/material/paginator";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    CatalogComponent,
    ProductListComponent,
    ProductListCatalogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    MatPaginatorModule
  ],
  providers: [HttpService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
