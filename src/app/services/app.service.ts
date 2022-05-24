import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';
//import { ToastrService } from 'ngx-toastr';


declare var $:any;
@Injectable({
  providedIn: 'root'
})
export class AppService {

  userToken: any;
  headers: HttpHeaders;
  constructor(
      private http: HttpClient
      //private toastr: ToastrService
  ) {
    this.userToken = this.getToken();
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.userToken
    });
  }

  /*
  showNotification(from = 'top', align = 'r¡ght', message: string, classAlert: string) {
    const type = ['', 'info', 'success', 'warning', 'danger'];
    const icons = {'': '', 'info': 'pe-7s-info', 'success': 'pe-7s-check', 'warning': 'pe-7s-bell', 'danger': 'pe-7s-shield' }
    switch ( classAlert ) {
      case 'success':
        this.toastr.success( message);
        break;
      case 'info':
        this.toastr.info( message);
        break;
      case 'warning':
        this.toastr.warning( message);
        break;
      case 'error':
        this.toastr.error( message);
        break;
      case 'danger':
        this.toastr.error( message);
        break;
    }

  }
  */


  consolePrint(method: string, element: any, text?: string ) {
    if ( !environment.production ) {
      if ( text !== 'undefined' )  { console.log(text); }

      switch (method) {
        case 'dir':
          console.dir(element);
          break;
        case 'error':
          console.error(element);
          break;
        case 'warn':
          console.warn(element);
          break;
        default:
          console.log(element);
          break;
      }
    }
  }


  getToken() {
    return (localStorage.getItem('token'))? localStorage.getItem('token'): '';
  }

  getHtmlOptionsWithToken() {
    const HEADERS = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken(),
      'platform': 'web'
    });
    return {headers: HEADERS};
  }


  printMessageErrorService(error: HttpErrorResponse) {
    this.consolePrint('error', error, 'ERROR SERVICE');
    const HTML = `
             <p>${error['statusText']}</p>
             <p>${ ( typeof error['error'] === 'object' ) ? error['error']['error'] : error['error'] }</p>
             <span>${error['message']}</span>
            `;
    Swal.close();
    //this.showNotification('top', 'right', HTML, 'danger');
  }

}
