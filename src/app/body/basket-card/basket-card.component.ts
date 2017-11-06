import { Component, OnInit } from '@angular/core';
import {AppStore} from "../../app.store.service";
import {HttpService} from "../../http.service";
import {AuthenticationService} from "../../autentication.service";

@Component({
  selector: 'app-basket-card',
  templateUrl: 'basket-card.component.html',
  styleUrls: ['basket-card.component.css']
})
export class BasketCardComponent implements OnInit {
  constructor(private auth: AuthenticationService, private http: HttpService,
              private store: AppStore) { }
  quantity: number;
  ngOnInit() {
    this.refreshBasketState();
    this.store.select('productsQuantity')
        .subscribe((data) => {
          this.refreshBasketState()
        })
  }

  refreshBasketState() {
    const info = JSON.parse(localStorage.getItem(this.auth.getUserUsername()));
    if (info) {
      this.quantity = info.length;
    } else {
      this.quantity = 0;
    }
  }


}
