import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError} from 'rxjs/operators';
import {throwError, Subject} from 'rxjs';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

import {UserModel} from '../models/user.model';
import {AppService} from './app.service';
import {HttpResponseModel} from "../models/HttpResponse.model";
import {Observable} from "rxjs/Rx";


@Injectable({
  providedIn: 'root'
})
export class UserService {


  private userLogin?: UserModel;
  private userLogin$: Subject<UserModel>;

  userToken: any;
  user: UserModel;
  constructor(
      private http: HttpClient,
      private appService: AppService,
      private cookieService: CookieService
  ) {
    this.userToken = this.appService.getToken();
    this.user = new UserModel();
    this.userLogin$ = new Subject();
  }


  setUserLogin(user: UserModel){
    this.userLogin = user;
    localStorage.setItem('user', user.toString());
    this.userLogin$.next(this.userLogin);
  }

  getUserLogin$() : Observable<UserModel> {

    return this.userLogin$.asObservable();
  }


  login( user: UserModel ) {
    const authData = {
      ...user
    };

    this.appService.consolePrint("log", authData,"USER::::");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${environment.url}/login`;
    return this.http.post(url, authData, {headers: headers}).pipe(
        map( (resp: HttpResponseModel ) => {
          const data = resp.data;
          this.setLocalUser(data.user);
          this.appService.consolePrint('dir', resp, `MAP ${url}`);
          this.cookieService.set(environment.token, data.token, {expires: new Date(data.expiration*1000)});
          this.cookieService.set(environment.expiration, data.expiration, {expires: new Date(data.expiration*1000)});
          return resp;
        })
    );
  }


  setLocalUser(user: any){
    for (let attr in user){
      localStorage.setItem(attr, user[attr])
    }
    this.getLocalUser();
  }

  removeLocalUser(){
    let userL = this.getLocalUser();
    for (let attr in userL){
      localStorage.removeItem(attr);
    }
  }

  getLocalUser() {
    let userL = new UserModel();
    let user: any = {};

    for(let attr in userL){
      console.log(localStorage.getItem(attr.toString()))
      user[attr] = (localStorage.getItem(attr.toString())) ? localStorage.getItem(attr.toString()) : '';
    }
    userL = {...user};
    return userL
  }

}
