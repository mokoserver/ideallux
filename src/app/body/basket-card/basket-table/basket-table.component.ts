import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../autentication.service";
import {HttpService} from "../../../http.service";
import {InitMain} from "../../../../assets/js/main.init";

@Component({
  selector: 'app-basket-table',
  templateUrl: './basket-table.component.html',
  styleUrls: ['./basket-table.component.css']
})
export class BasketTableComponent implements OnInit {
  data$ = [];
  constructor(private auth: AuthenticationService, private http: HttpService) { }

  ngOnInit() {
    const info = JSON.parse(localStorage.getItem(this.auth.getUserUsername()));
    if (!info) return;
    info.map(data => {
      this.http.getProductById(data._id)
          .subscribe(loaded => {
            loaded.quantity = data.quantity;
            this.data$.push(loaded)
          })
    });
    this.setScripts();
  }

  setScripts() {
    setTimeout(() => {
      InitMain.cartPlusMinusButton();
    }, 1000);
  }


}
