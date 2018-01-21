import {Component, OnInit, AfterViewInit} from '@angular/core';
import {AppStore} from "../app.store.service";
import {AuthenticationService} from "../autentication.service";
import {InitMain} from "../../assets/js/main.init";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  quantity: number;

  constructor(private store: AppStore, private auth: AuthenticationService) {
  }

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

  ngAfterViewInit(): void {
    InitMain.blogPageManuDropdown();
    InitMain.initMeanmenu();
  }
}
