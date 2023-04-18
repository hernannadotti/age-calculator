import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {
  dateForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.configForm();
  }

  private configForm() {
    this.dateForm = this.fb.group({
      day: new FormControl(1),
      month: new FormControl(2),
      year: new FormControl(3),
    })
  }

}
