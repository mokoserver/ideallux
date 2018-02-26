import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../../http.service";
import {AuthenticationService} from "../../../autentication.service";
import {AppStore} from "../../../app.store.service";
import {products} from './productsOK'

@Component({
  selector: 'app-product-list-catalog',
  templateUrl: './product-list-catalog.component.html',
  styleUrls: ['./product-list-catalog.component.css']
})
export class ProductListCatalogComponent implements OnInit {
  products: any[];
  @Input() paginatorPageSize = 9;
  @Input() listView = true;
  paginatorPage: any = 0;
  category: string;
  filter: {};
  cache;

  constructor(private activatedRoute: ActivatedRoute, private httpService: HttpService,
              private auth: AuthenticationService, private store: AppStore) {
    this.cache = JSON.parse(localStorage.getItem(this.auth.getUserUsername()));
    if (!this.cache) {
      localStorage.setItem(this.auth.getUserUsername(), JSON.stringify([]));
      this.cache = [];
    }
  }

  ngOnInit() {
     this.activatedRoute.queryParamMap
        .subscribe(queryParams => {
          this.category = queryParams.get('category');
          this.paginatorPage = 0;

          if (queryParams.get('filter')) {
            const filter = queryParams.get('filter').split(':');
            this.filter = {
              key: filter[0],
              value: filter[1]
            };
            // this.getProductsFromFile();
            this.getProducts();
          } else {
            this.filter = undefined;
            this.getProducts();
          }
        })
  }

  isActive(id): boolean {
    if (this.cache) {
      return Boolean(this.cache.find(object => object._id == id));
    }
  }

  getProducts() {
    this.httpService.getProducts(this.category, this.paginatorPage, this.paginatorPageSize, this.filter)
        .subscribe(data => this.products = data);
  }

  getProductsFromFile() {
    if (products.length && this.filter && this.filter['value']) {
      this.products = [...products].filter((obj: any) => {
        const title = obj.title.toLowerCase();
        const value = this.filter['value'].toLowerCase();
        return (typeof title === 'string') ? title.includes(value) : false;
      })
      .map(items => {
        const item = <any>items;
        if (item.images) {
          for (let j = 0; j < item.images.length; j++) {
            if (item.images[j].id) {
              item.images[j] = this.httpService.getImage(item.images[j].id)
            }
          }
        }
        return item
      });
      console.log(this.products)

    }
  }

  getPaginatorOptions(options) {
    this.paginatorPage = options.pageIndex;
    this.paginatorPageSize = options.pageSize;
    this.getProducts();
  }

  addToBasket(id) {
    if (this.cache && this.cache.find(object => object._id == id)) {
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
