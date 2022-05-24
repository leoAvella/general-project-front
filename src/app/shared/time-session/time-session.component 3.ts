import { Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import {ClockService} from '../../services/clock.service';
import {ValueClock} from '../../models/valueClock.model';


@Component({
  selector: 'app-time-session',
  templateUrl: './time-session.component.html',
  styleUrls: ['./time-session.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TimeSessionComponent implements OnInit {

  public dataClock$?: Observable<ValueClock>;
  public dataSession$?: Observable<ValueClock>;
  dataC?:ValueClock;
  dataS?: ValueClock;

  constructor(
      private modalService: NgbModal,
      private clock : ClockService,
      private cookieService: CookieService
  ) {

  }

  @ViewChild('content') content:any;


  ngOnInit(): void {
    this.getTime();
    this.getTimeSession();
    console.log(":::",this.cookieService.get('TKN'));
  }


  getTime(){
    this.dataClock$  = this.clock.getTime();
    this.dataClock$.subscribe( x => {
      this.dataC = x;
    });
  }


  transformTime(time: any){
    const num = time.toString();
    return ( num.length === 1  ) ? `0${num}` : num;
  }

  getTimeSession(){
    this.dataClock$ = this.clock.getTimeSession(1646757335);
    this.dataClock$.subscribe(x => {
      this.dataS = x;
      //if ( parseInt(this.dataS.minutes) === 0 && parseInt(this.dataS.secont) === 0 ) this.dataClock$.unsuscribe();

    });
  }






  open() {
    this.modalService.open( this.content , {
      windowClass: 'custom-class',
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
  }


}
