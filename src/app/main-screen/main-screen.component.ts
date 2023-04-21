import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {
  dateForm: FormGroup;
  years:number;
  months:number;
  days:number;
  valid: boolean = false;
  asked: boolean = false;
  momDate;
  currentDate;
  value;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.configForm();
    this.initSubscriptions();
  }

  calculateAge(event) {
    let date = this.value.year + "-" + this.value.month + "-" + this.value.day;
    this.momDate = moment(date, 'YYYY/MM/DD');
    this.currentDate = moment();
    this.getYearMonthsDays(this.currentDate, this.momDate);
  }

  cleanForm():void {
    this.dateForm.get('year').setValue('');
    this.dateForm.get('month').setValue('');
    this.dateForm.get('day').setValue('');
  }

  isFuture(): boolean {
    return (moment(this.momDate).isAfter(moment(this.currentDate)))
  }

  private configForm() {
    this.dateForm = this.fb.group({
      day: new FormControl('', [Validators.required, Validators.minLength(1),Validators.maxLength(2), Validators.min(1),Validators.max(31)]),
      month: new FormControl('', [Validators.required, Validators.minLength(1),Validators.maxLength(2), Validators.min(1),Validators.max(12)]),
      year: new FormControl('', [Validators.required, Validators.minLength(4),Validators.maxLength(4)]),
    })
  }

  private initSubscriptions() {
    let date;
    this.dateForm.valueChanges.subscribe((value: any) => {
      this.value = value;
      this.momDate = moment(date, 'YYYY/MM/DD');
      this.asked = false;
    })
  }

  private getYearMonthsDays(a, b) {
    if(this.dateForm.valid && moment(a).isValid && moment(b).isValid) {
      if(!this.isFuture()) {
        this.years = a.diff(b, 'year');
        b.add(this.years, 'years');
        this.months = a.diff(b, 'months');
        b.add(this.months, 'months');
        this.days = a.diff(b, 'days');
        this.dateForm.setErrors(null);
      } else {
        this.dateForm.setErrors({ isFuture: true });
      }
      this.asked = true;
    }
  }
}
