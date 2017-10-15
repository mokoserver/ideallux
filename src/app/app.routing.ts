import {Routes} from '@angular/router';
import {CatalogComponent} from "./body/catalog/catalog.component";
import {ProductListComponent} from "./body/product-list/product-list.component";

export const AppRoutes: Routes = [
  {path: '', component: CatalogComponent},
  {path: 'product-list', component: ProductListComponent}
]
