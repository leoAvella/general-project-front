import { Injectable } from '@angular/core';
import {timer, Observable, Subject} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {ValueClock} from '../models/valueClock.model'


@Injectable({
  providedIn: 'root'
})




export class ClockService {


  clock: Observable <Date>;
  infodate$ = new Subject<ValueClock>();
  vr?: ValueClock;
  infodateS$ = new Subject<ValueClock>();
  vrS?: ValueClock;


  targetDate?: any;
  cDateMillisecs?: any;
  tDateMillisecs?: any;
  difference?: any;
  seconds?: any;
  minutes?: any;
  hours?: any;
  days?: any;



  constructor() {
    this.clock = timer(0,1000).pipe(map(t => new Date()),shareReplay(1));
  }


  getTime(): Observable<ValueClock>{
    this.clock.subscribe(t => {
      this.hours = t.getHours() % 12;
      this.hours = this.hours ? this.hours : 12;
      this.vr = {
        hour: this.hours,
        minutes: (t.getMinutes() < 10) ? '0' + t.getMinutes() : t.getMinutes().toString(),
        ampm: t.getHours() > 11 ? 'PM' : 'AM',
        dayofWeek: t.toLocaleString('es-MX', { day: '2-digit', month: 'long' }).replace('.', '').replace('-', ' '),
        dayMonth: t.toLocaleString('es-MX', { weekday: 'long' }).replace('.', ''),
        secont: t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds().toString()

      }
      this.infodate$.next(this.vr);
    });
    return this.infodate$.asObservable();

  }


  getTimeSession(dateExpiration: number): Observable<ValueClock>{

    this.targetDate = new Date(dateExpiration*1000);

    this.clock.subscribe(t =>{

      this.cDateMillisecs = t.getTime();
      this.tDateMillisecs = this.targetDate.getTime();
      this.difference = this.tDateMillisecs - this.cDateMillisecs;

      this.seconds = Math.floor(this.difference / 1000);
      this.minutes = Math.floor(this.seconds / 60);
      this.hours = Math.floor(this.minutes / 60);
      this.days = Math.floor(this.hours / 24);

      this.hours %= 24;
      this.minutes %= 60;
      this.seconds %= 60;

      this.vrS = {
        hour: this.hours < 10 ? '0' + this.hours : this.hours,
        minutes: this.minutes < 10 ? '0' + this.minutes : this.minutes,
        secont: this.seconds < 10 ? '0' + this.seconds : this.seconds
      }
      this.infodateS$.next(this.vrS);
    });

    return this.infodateS$.asObservable();

  }



}
