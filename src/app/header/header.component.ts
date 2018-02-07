import {Component, OnInit, AfterViewInit} from '@angular/core';
import {AppStore} from "../app.store.service";
import {AuthenticationService} from "../autentication.service";
import {InitMain} from "../../assets/js/main.init";
import {FormGroup, FormControl} from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  quantity: number;
  form: FormGroup;

  constructor(private store: AppStore, private auth: AuthenticationService,
    private router: Router) {
    this.form = new FormGroup({
      input: new FormControl('')
    })
  }

  ngOnInit() {
    this.refreshBasketState();
    this.store.select('productsQuantity')
        .subscribe((data) => {
          this.refreshBasketState()
        });
    this.form.valueChanges.debounceTime(200).subscribe(form => {
      this.router.navigate(['/product-list'], { queryParams: { filter: form.input } })
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
