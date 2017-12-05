import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../../http.service";
import {Observable, Subscription} from "rxjs";
import {Product} from "../../../models/product";
import {AuthenticationService} from "../../../autentication.service";
import {AppStore} from "../../../app.store.service";

@Component({
  selector: 'app-product-list-catalog',
  templateUrl: './product-list-catalog.component.html',
  styleUrls: ['./product-list-catalog.component.css']
})
export class ProductListCatalogComponent implements OnInit {
  products: Product[];
  @Input() paginatorPageSize = 9;
  @Input() listView = true;
  paginatorPage: any = 0;
  category: string;
  cache;

  constructor(private activatedRoute: ActivatedRoute, private httpService: HttpService,
              private auth: AuthenticationService, private store: AppStore) {
    this.cache = JSON.parse(localStorage.getItem(this.auth.getUserUsername()));
    console.log(this.cache)
  }

  ngOnInit() {
     this.activatedRoute.queryParamMap
        .subscribe(data => {
          this.category = data.get('category');
          this.getProducts();
        })
  }

  isActive(id): boolean {
    if (this.cache) {
      return Boolean(this.cache.find(object => object._id == id));
    }
  }

  getProducts() {
    this.httpService.getProducts(this.category, this.paginatorPage, this.paginatorPageSize)
        .subscribe(data => this.products = data);
  }

  getPaginatorOptions(options) {
    this.paginatorPage = options.pageIndex;
    this.paginatorPageSize = options.pageSize;
    this.getProducts();
  }

  addToBasket(id) {
    if (this.cache.find(object => object._id == id)) {
      this.cache.splice(this.cache.findIndex(data => data._id == id), 1);
      if (!this.cache.length) {
        localStorage.clear();
      } else {
        localStorage.setItem(this.auth.getUserUsername(), JSON.stringify(this.cache));
      }
      this.store.setValue('productsQuantity', new Date());
    } else {
      const obj = {
        _id: id,
        quantity: 1
      };

      if (!this.cache || !this.cache.length || this.cache.findIndex(data => data._id == id) === -1) {
        this.cache.push(obj);
      }

      localStorage.setItem(this.auth.getUserUsername(), JSON.stringify(this.cache));

      this.store.setValue('productsQuantity', new Date());
    }
  }

}
