import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../http.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../autentication.service';
import {AppStore} from "../../../app.store.service";

@Component({
  selector: 'app-basket-make-order',
  templateUrl: './basket-make-order.component.html',
  styleUrls: ['./basket-make-order.component.css']
})
export class BasketMakeOrderComponent implements OnInit {
  public form: FormGroup;
  constructor(private service: HttpService, private auth: AuthenticationService,
              private store: AppStore) {
    this.form = new FormGroup({
      note: new FormControl('', Validators.required),
      customer: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      date: new FormControl(''),
      deviceid: new FormControl(''),
      orderitems: new FormControl('')
    });
  }

  ngOnInit() {
  }

  makeOrder() {
    const cache = JSON.parse(localStorage.getItem(this.auth.getUserUsername()));
    this.form.patchValue({
      date: new Date(),
      orderitems: cache,
      deviceid: this.auth.getUserUsername()
    });
    this.service.postNewOrder(this.form).subscribe(() => {
      localStorage.clear();
      this.store.setValue('productsQuantity', new Date());
    });
  }

}
