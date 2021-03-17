import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public dateSelected: any;
  public date: any;
  public animation: any;
  public animationError: any;
  public animationCalendar: any;
  public arrayMonths: Array<{}> = [];
  public arrayDays: Array<{}> = [];
  public totalDays: Array<{}> = [];
  public position: Array<{}> = [];
  public listDay: any;

  constructor() {
    this.date = [];
    this.listDay = [];
    this.dateSelected = new Date();
    this.arrayMonths = [{
      id : 0,
      name : 'Selecciona un mes'
    },
    {
      id : 1,
      name: 'Enero'
    },{
      id : 2,
      name: 'Febrero'
    },{
      id : 3,
      name: 'Marzo'
    },{
      id : 4,
      name: 'Abril'
    },{
      id : 5,
      name: 'Mayo'
    },{
      id : 6,
      name: 'Junio'
    },{
      id : 7,
      name: 'Julio'
    },{
      id : 8,
      name: 'Agosto'
    },{
      id : 9,
      name: 'Septiembre'
    },{
      id : 10,
      name: 'Octubre'
    },{
      id : 11,
      name: 'Noviembre'
    },{
      id : 12,
      name: 'Diciembre'
    }];
    this.date.month = 0;
    this.init();
  }

  ngOnInit(): void {
  }

  public init() {
    !localStorage.getItem('month') ? this.animation = 'animation-calendar' : this.animation = '';
  }

  public msgErr() {
    this.animation = 'animation-calendar';
    this.animationError = '';
  }

  public continue(e) {
    if(e == 0) {
      this.animationError = 'animation-calendar';
      this.animation = '';
    } else {
      this.getDaysMonths(e, this.dateSelected.getFullYear());
    }
  }

  public onChangeReplace(e) {
    this.arrayDays = [];
    this.totalDays = [];
    if(e == 0) {
      this.animationError = 'animation-calendar';
      this.animationCalendar = '';
      this.animation = '';
    } else {
      this.getDaysMonths(e, this.dateSelected.getFullYear());
    }
  }

  public getDaysMonths(m, y) {
    this.animationCalendar = 'animationShowCalendar';
    this.animation = '';
    let list = [];
    let resto;
    let sw = 0;
    let days = new Date(y, m, 0).getDate();
    let day = this.getStartDayMonth(y, m);
    //se la posición del día
    for (let i = 0; i < day; i++){
      this.totalDays.push('');
    }
    // Me asigno los días del mes
    for (let i = 1; i <= days; i++){
      this.totalDays.push(i);
    }

    for(let i = 0; i < this.totalDays.length; i++) {
      resto = i % 7;
      if(resto == 0 && i != 0) {
        sw = sw + 1;
        this.arrayDays[sw] = list;
        list = [];
        list.push({id : this.totalDays[i]});
      } else {
        list.push({id : this.totalDays[i]});
      }
    }
    if(list.length < 7) {
      for(let i = list.length; i <= 7; i++) {
        list.push({id : ''});
      }
    }
    this.arrayDays[sw + 1] = list;
  }


  public getStartDayMonth(y, m) {
    let nameDay = new Date(y, m - 1, 1);
    if(nameDay.toString().indexOf('Sun') == 0) {
      return 0
    } else if(nameDay.toString().indexOf('Mon') == 0) {
      return 1
    } else if(nameDay.toString().indexOf('Tue') == 0) {
      return 2
    } else if(nameDay.toString().indexOf('Wed') == 0) {
      return 3
    } else if(nameDay.toString().indexOf('Thu') == 0) {
      return 4
    } else if(nameDay.toString().indexOf('Fri') == 0) {
      return 5
    } else if(nameDay.toString().indexOf('Sat') == 0) {
      return 6
    }

  }

}
