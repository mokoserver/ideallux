import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {HttpService} from "../http.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  form: FormGroup;
  constructor(private httpService: HttpService) {
    this.form = new FormGroup({
      author: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
      category: new FormControl('Обратная связь')
    })
  }

  sendFeedback() {
    console.log(this.form);
    this.httpService.postMessage(this.form).subscribe()
  }
}
