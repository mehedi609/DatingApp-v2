import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model: any = {};

  @Input() usersFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  register(): void {
    console.log(this.model);
  }

  cancel(): void {
    this.cancelRegister.emit(false);
  }
}
