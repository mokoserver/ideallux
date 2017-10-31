import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {HttpService} from "../../../http.service";
import {Product} from "../../../models/product";
import 'rxjs/add/operator/switchMap';
import {InitMain} from "../../../../assets/js/main.init";
import {AuthenticationService} from "../../../autentication.service";

@Component({
  selector: 'app-product',
  templateUrl: 'product-item.component.html',
  styleUrls: ['product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  product: Product;
  localArray = [];

  constructor(private activatedRoute: ActivatedRoute, private httpService: HttpService, private auth: AuthenticationService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap
        .switchMap((params: ParamMap) => {
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
    }, 1000);
  }

  addToBasket(id) {
    const cache = JSON.parse(localStorage.getItem(this.auth.getUserUsername()));

    if (cache) {
      for (let i = 0; i < cache.length; i++) {
        this.localArray.push(cache[i]);
      }
    }

    const obj = {
      _id: id,
      quantity: parseInt((<any>document.getElementById('qtybutton')).value)
    };
    this.localArray.push(obj);

    localStorage.setItem(this.auth.getUserUsername(), JSON.stringify(this.localArray));
  }
}
