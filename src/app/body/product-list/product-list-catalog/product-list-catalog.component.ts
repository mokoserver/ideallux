import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../../http.service";
import {Observable, Subscription} from "rxjs";
import {Product} from "../../../models/product";

@Component({
  selector: 'app-product-list-catalog',
  templateUrl: './product-list-catalog.component.html',
  styleUrls: ['./product-list-catalog.component.css']
})
export class ProductListCatalogComponent implements OnInit {
  products: Product[];
  categories$: Observable<any>;
  subProducts$: Subscription;
  paginatorPageSize: any = 9;
  paginatorPage: any = 0;
  category: string;

  constructor(private activatedRoute: ActivatedRoute, private httpService: HttpService) {
  }

  ngOnInit() {
     this.activatedRoute.queryParamMap
        .subscribe(data => {
          this.category = data.get('category');
          this.getProducts();
        })
  }

  getProducts() {
    this.httpService.getProducts(this.category, this.paginatorPage, this.paginatorPageSize)
        .subscribe(data => this.products = data);
  }

  setPaginatorDefaults() {
    this.paginatorPage = 0;
  }

  getPaginatorOptions(options) {
    this.paginatorPage = options.pageIndex;
    this.paginatorPageSize = options.pageSize;
    this.getProducts();
  }

}
