import {Routes} from '@angular/router';
import {CatalogComponent} from "./body/catalog/catalog.component";
import {ProductListComponent} from "./body/product-list/product-list.component";
import {SingleProductComponent} from "./body/single-product/single-product.component";
import {BasketCardComponent} from "./body/basket-card/basket-card.component";

export const AppRoutes: Routes = [
  {path: '', component: CatalogComponent},
  {path: 'product-list', component: ProductListComponent},
  {path: 'product', component: SingleProductComponent},
  {path: 'basket', component: BasketCardComponent},
]
