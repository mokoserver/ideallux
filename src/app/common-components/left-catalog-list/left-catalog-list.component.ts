import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-left-catalog-list',
  templateUrl: 'left-catalog-list.component.html',
  styleUrls: ['left-catalog-list.component.css']
})
export class LeftCatalogListComponent implements OnInit {
  @Input() pull = '-pull';
  @Input() colMd = '3';
  constructor() { }

  ngOnInit() {
  }

}
