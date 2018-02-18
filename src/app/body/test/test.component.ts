import { Component, OnInit} from '@angular/core';
import {Swiper} from 'swiper';

console.log(Swiper);

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})

export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var mySwiper = new Swiper('.swiper-container', {
    speed: 400,
    spaceBetween: 100
  });

  }

}
