import {Component, OnInit, Input} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-left-catalog-list',
  templateUrl: 'left-catalog-list.component.html',
  styleUrls: ['left-catalog-list.component.css']
})
export class LeftCatalogListComponent implements OnInit {
  @Input() pull = '-pull';
  @Input() colMd = '3';
  form: FormGroup;
  constructor(private router: Router) {
    this.form = new FormGroup({
      input: new FormControl('')
    })
  }

  ngOnInit() {
    this.form.valueChanges.debounceTime(400).subscribe(form => {
      this.router.navigate(
          ['/product-list'], {
            queryParams: {filter: form.input ? `title:${form.input}` : ``},
            queryParamsHandling: 'merge'
          })
    })
  }

}
