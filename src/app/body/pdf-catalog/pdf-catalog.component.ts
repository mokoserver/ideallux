import {Component, OnInit} from '@angular/core';

import {Pdfitem} from './pdf-item';

@Component({
  selector: 'app-pdf-catalog',
  templateUrl: './pdf-catalog.component.html',
  styleUrls: ['./pdf-catalog.component.css']
})
export class PdfCatalogComponent implements OnInit {

  pdfitems: Pdfitem [] = [
    {name: 'ABB Basic 55.pdf', imgurl: 'assets/pdf/ABB Basic 55.jpg', pdfurl: 'assets/pdf/ABB Basic 55.pdf'},
    {name: 'Abris 2017.pdf', imgurl: 'assets/pdf/Abris 2017.jpg', pdfurl: 'assets/pdf/Abris 2017.pdf'},
    {name: 'Arlight Алюминиевый профиль  2017.pdf', imgurl: 'assets/pdf/Arlight Алюминиевый профиль  2017.jpg', pdfurl: 'assets/pdf/Arlight Алюминиевый профиль  2017.pdf'},
    {name: 'Arlight Алюминиевый профиль для монтажа в гипсокартон 2017.pdf', imgurl: 'assets/pdf/Arlight Алюминиевый профиль для монтажа в гипсокартон 2017.jpg', pdfurl: 'assets/pdf/Arlight Алюминиевый профиль для монтажа в гипсокартон 2017.pdf'},
    {name: 'Arlight Источники питания 2017.pdf', imgurl: 'assets/pdf/Arlight Источники питания 2017.jpg', pdfurl: 'assets/pdf/Arlight Источники питания 2017.pdf'}

  ];

  constructor() {
    // this.pdfitems.name = 'ABB Basic 55.pdf';
    // this.pdfitems.imgurl = 'assets/pdf/ABB Basic 55.jpg';
    // this.pdfitems.pdfurl = 'assets/pdf/ABB Basic 55.pdf';
  }

  ngOnInit() {
  }

}
