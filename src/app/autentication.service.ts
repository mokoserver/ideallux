import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
  private username = 'IDEALLUX';
  private password = 123;


  getUserUsername() {
    return this.username;
  }

  getLoginAndPassword() {
    return {login: this.username, password: this.password};
  }

}
