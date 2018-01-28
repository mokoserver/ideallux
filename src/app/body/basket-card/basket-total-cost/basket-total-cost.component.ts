import { Component, OnInit } from '@angular/core';
import { AppStore } from '../../../app.store.service';
import { AuthenticationService } from '../../../autentication.service';

@Component({
  selector: 'app-basket-total-cost',
  templateUrl: './basket-total-cost.component.html',
  styleUrls: ['./basket-total-cost.component.css']

})
export class BasketTotalCostComponent implements OnInit {
  totalCost;
  constructor(private store: AppStore, private auth: AuthenticationService) { }

  ngOnInit() {
    this.store.select('productsQuantity').subscribe(data => {
      const cache = JSON.parse(localStorage.getItem(this.auth.getUserUsername()));
      this.totalCost = 0;
      cache.forEach(element => {
        this.totalCost = this.totalCost + (element.quantity * element.price);
      });
    })
  }

}
