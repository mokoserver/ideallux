import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/pluck'

export interface State {
  productsQuantity: number;
}

const defaultState = {
  productsQuantity: null
};

const _store = new BehaviorSubject<State>(defaultState);

@Injectable()
export class AppStore {
  private _store = _store;
  changes = this._store.asObservable().distinctUntilChanged();

  select(name: string): Observable<any> {
    return this.changes.pluck(name).distinctUntilChanged();
  }

  setState(state: State) {
    this._store.next(state);
  }

  getState(): State {
    return this._clone(this._store.value);
  }

  getValue(prop?: string): any {
    let state = this._clone(this._store.value);
    return prop ? state[prop] : state;
  }

  setValue(prop?: string, value?: any): any {
    let state = this._clone(this._store.value);
    state[prop] = value;
    this._store.next(state);
  }

  purge() {
    this._store.next(defaultState);
  }

  _clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  toJSON() {
    return this._store.value;
  }
}