import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutes} from "./app.routing";
import {CatalogComponent} from './body/catalog/catalog.component';
import {ProductListComponent} from './body/product-list/product-list.component';
import {ProductListCatalogComponent} from './body/product-list/product-list-catalog/product-list-catalog.component';
import {HttpService} from "./http.service";
import {HttpClientModule} from "@angular/common/http";
import {AuthenticationService} from "./autentication.service";
import {MatPaginatorModule} from "@angular/material/paginator";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LeftCatalogListComponent} from './common-components/left-catalog-list/left-catalog-list.component';
import {SingleProductComponent} from './body/single-product/single-product.component';
import {ProductItemComponent} from './body/single-product/product-item/product-item.component';
import {BasketCardComponent} from "./body/basket-card/basket-card.component";
import {BasketCheckoutComponent} from './body/basket-card/basket-checkout/basket-checkout.component';
import {BasketTableComponent} from './body/basket-card/basket-table/basket-table.component';
import {BasketTotalCostComponent} from './body/basket-card/basket-total-cost/basket-total-cost.component';
import {BasketOrderCompleteComponent} from './body/basket-card/basket-order-complete/basket-order-complete.component';
import {BasketMakeOrderComponent} from './body/basket-card/basket-make-order/basket-make-order.component';
import {AppStore} from "./app.store.service";
import { MapComponent } from './body/map/map.component';
import { PdfCatalogComponent } from './body/pdf-catalog/pdf-catalog.component';
import {MaterialaginatorIntl} from "./shared/mat-pager-intl";
import {MatPaginatorIntl} from "@angular/material";
import { DeliveryComponent } from './body/delivery/delivery.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    CatalogComponent,
    ProductListComponent,
    ProductListCatalogComponent,
    LeftCatalogListComponent,
    SingleProductComponent,
    ProductItemComponent,
    BasketCardComponent,
    BasketCheckoutComponent,
    BasketTableComponent,
    BasketTotalCostComponent,
    BasketOrderCompleteComponent,
    BasketMakeOrderComponent,
    MapComponent,
    PdfCatalogComponent,
    DeliveryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    MatPaginatorModule
  ],
  providers: [HttpService, AuthenticationService, AppStore,
    {provide: MatPaginatorIntl, useClass: MaterialaginatorIntl}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
