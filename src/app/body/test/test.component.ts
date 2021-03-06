import { Component, OnInit} from '@angular/core';
declare const require;
// import Swiper from 'swiper';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})

export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const Swiper = require('../../../../node_modules/swiper/dist/js/swiper.min')
    const swiperElement = new Swiper('.swiper-container', {
      initialSlide: '1',
      speed: 300,
      spaceBetween: 100,
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows : true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        speed: 300,
      }
    });
  }
}
