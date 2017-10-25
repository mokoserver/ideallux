import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {HttpService} from "../../../http.service";
import {Observable} from "rxjs/Observable";
import {Product} from "../../../models/product";
import 'rxjs/add/operator/switchMap';
import {InitMain} from "../../../../assets/js/main.init";

@Component({
  selector: 'app-product',
  templateUrl: 'product-item.component.html',
  styleUrls: ['product-item.component.css']
})
export class ProductItemComponent implements OnInit, AfterViewInit {
  product: Product;
  constructor(private activatedRoute: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap
        .switchMap((params: ParamMap) => {
          return this.httpService.getProductById(params.get('id'))
        })
        .subscribe(data => {
          this.product = data
          console.log(data)
        });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      InitMain.elevateZoomActive();
      // InitMain.slickSingleProductZoomImage();
      InitMain.cartPlusMinusButton();
    }, 1000);
  }

}
