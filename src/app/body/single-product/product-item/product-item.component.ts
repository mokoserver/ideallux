import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../../http.service";
import {Observable} from "rxjs";
import {Product} from "../../../models/product";

@Component({
  selector: 'app-product',
  templateUrl: 'product-item.component.html',
  styleUrls: ['product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  item$: Observable<Product>;

  constructor(private activatedRoute: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit() {
    this.item$ = this.activatedRoute.queryParamMap
        .switchMap(data => {
          let id = data.get('id');
          return this.httpService.getProductById(id).subscribe(data => {
            console.log(data);
          })
        })
  }

}
