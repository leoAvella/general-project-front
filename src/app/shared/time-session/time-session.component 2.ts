import { Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

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
  dataC?:ValueClock;
  dataS?: ValueClock;

  constructor(private modalService: NgbModal, private clock : ClockService) {

  }

  @ViewChild('content') content:any;


  ngOnInit(): void {
    this.getTime();
    //this.getTimeSession();
  }


  getTime(){
    this.dataClock$  = this.clock.getTime();
    this.dataClock$.subscribe( x => {
      this.dataC = x;
    });
  }


  getTimeSession(){
    this.dataClock$ = this.clock.getTimeSession(1646448955);
    this.dataClock$.subscribe(x => {
      this.dataS = x;
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
