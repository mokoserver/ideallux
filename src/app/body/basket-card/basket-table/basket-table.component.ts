import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthenticationService} from "../../../autentication.service";
import {HttpService} from "../../../http.service";
import {InitMain} from "../../../../assets/js/main.init";
import {AppStore} from "../../../app.store.service";

@Component({
  selector: 'app-basket-table',
  templateUrl: './basket-table.component.html',
  styleUrls: ['./basket-table.component.css']
})
export class BasketTableComponent implements OnInit {
  data$ = [];
  scriptsSetted = false;
  constructor(private auth: AuthenticationService, private http: HttpService,
              private store: AppStore) { }

  ngOnInit() {
    const info = JSON.parse(localStorage.getItem(this.auth.getUserUsername()));
    if (!info) return;
    info.map(data => {
      console.log(data)
      this.http.getProductById(data._id)
          .subscribe(loaded => {
            if (!loaded) return;
            loaded.quantity = data.quantity;
            info.find(item => item._id === data._id).quantity = loaded.quantity;
            info.find(item => item._id === data._id).price = loaded.price;
            localStorage.setItem(this.auth.getUserUsername(), JSON.stringify(info));
            this.store.setValue('productsQuantity', new Date());
            this.data$.push(loaded)
          })
    });
  }

  deleteProduct(id) {
    const cache = JSON.parse(localStorage.getItem(this.auth.getUserUsername()));
    cache.splice(cache.findIndex(data => data._id == id), 1);
    this.data$.splice(this.data$.findIndex(data => data._id == id), 1);
    if (!cache.length) {
      localStorage.clear();
    } else {
      localStorage.setItem(this.auth.getUserUsername(), JSON.stringify(cache));
    }
    this.store.setValue('productsQuantity', new Date());
  }

  quantityChange(quantity, item) {
    const cache = JSON.parse(localStorage.getItem(this.auth.getUserUsername()));
    quantity.quantity += item;
    cache.find(data => data._id === quantity._id).quantity = quantity.quantity;
    cache.find(data => data._id === quantity._id).price = quantity.price;
    localStorage.setItem(this.auth.getUserUsername(), JSON.stringify(cache));
    this.store.setValue('productsQuantity', new Date());
  }
}