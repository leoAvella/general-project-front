import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef} from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';

import {ClockService} from '../../services/clock.service';
import {UserService} from '../../services/user.service';
import {ValueClock} from '../../models/valueClock.model';



@Component({
  selector: 'app-time-session',
  templateUrl: './time-session.component.html',
  styleUrls: ['./time-session.component.scss'],
  //encapsulation: ViewEncapsulation.None,
})
export class TimeSessionComponent implements OnInit {

  public dataClock$?: Observable<ValueClock>;
  public dataSession$?: Observable<ValueClock>;
  dataC?:ValueClock;
  dataS?: ValueClock;
  timeSession = false;
  modalLogin = false;

  constructor(
      private modalService: NgbModal,
      private clock : ClockService,
      private cookieService: CookieService,
      private userService: UserService
  ) {

  }

  @ViewChild('content', { static: true }) content?: ElementRef;


  ngOnInit(): void {
    this.getTime();
    if(!this.isLogin()){
      this.open();
    } else {
      this.getTimeSession();
    }
  }


  getTime(){
    this.dataClock$  = this.clock.getTime();
    this.dataClock$.subscribe( x => {
      this.dataC = x;
      if(!this.timeSession){
        if(this.isLogin()){
          this.timeSession = true;
          this.modalLogin = false;
          this.getTimeSession();
        }
      }
    });
  }


  transformTime(time: any){
    if(time){
      const num = time.toString();
      return ( num.length === 1  ) ? `0${num}` : num;
    }
  }

  getTimeSession(){

    this.dataSession$ = this.clock.getTimeSession(parseInt(this.cookieService.get(environment.expiration)));
    this.dataSession$.subscribe(x => {
      this.dataS = x;
      if(this.dataS.minutes && this.dataS.secont){
        if ( parseInt(this.dataS.minutes) === 0 && parseInt(this.dataS.secont) === 0 ) this.deteleCookie();
      }
    });

  }




  isLogin(){
    return (this.cookieService.get(environment.token)) ? true : false;
  }


  deteleCookie(){
    this.cookieService.delete(environment.token);
    this.cookieService.delete(environment.expiration);
    this.timeSession = false;
    this.userService.removeLocalUser();
    if (!this.modalLogin)this.open();
  }

  open() {
    this.modalService.open( this.content , {
      windowClass: 'custom-class',
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    this.modalLogin = true;
  }


}
