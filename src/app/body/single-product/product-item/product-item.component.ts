import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {HttpService} from "../../../http.service";
import {Product} from "../../../models/product";
import 'rxjs/add/operator/switchMap';
import {InitMain} from "../../../../assets/js/main.init";
import {AuthenticationService} from "../../../autentication.service";
import {AppStore} from "../../../app.store.service";

@Component({
  selector: 'app-product',
  templateUrl: 'product-item.component.html',
  styleUrls: ['product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  product: Product;
  localArray = [];

  constructor(private activatedRoute: ActivatedRoute, private httpService: HttpService,
              private auth: AuthenticationService, private store: AppStore) {
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap
        .switchMap((params: ParamMap) => {
          const cache = JSON.parse(localStorage.getItem(this.auth.getUserUsername()));
          if (cache) {
            const item = cache.find(object => object._id == params.get('id'));
            if (item) this.localArray.push(item);
          }
          return this.httpService.getProductById(params.get('id'))
        })
        .subscribe(data => {
          this.product = data;
          this.setScripts();
        });
  }

  setScripts() {
    setTimeout(() => {
      InitMain.elevateZoomActive();
      // InitMain.slickSingleProductZoomImage();
      InitMain.cartPlusMinusButton();
    }, 200);
  }

  addToBasket(id) {
    const cache = JSON.parse(localStorage.getItem(this.auth.getUserUsername()));

    if (this.localArray.length) {
      this.localArray = [];
      cache.splice(cache.findIndex(data => data._id == id), 1);
      if (!cache.length) {
        localStorage.clear();
      } else {
        localStorage.setItem(this.auth.getUserUsername(), JSON.stringify(cache));
      }
      this.store.setValue('productsQuantity', new Date());
      return;
    }

    if (cache) {
      for (let i = 0; i < cache.length; i++) {
        this.localArray.push(cache[i]);
      }
    }

    const obj = {
      _id: id,
      quantity: parseInt((<any>document.getElementById('qtybutton')).value)
    };

    if (!cache || !cache.length || cache.findIndex(data => data._id == id) === -1) {
      this.localArray.push(obj);
    }

    localStorage.setItem(this.auth.getUserUsername(), JSON.stringify(this.localArray));

    this.store.setValue('productsQuantity', new Date());
  }
}
