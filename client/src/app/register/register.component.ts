import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { log } from 'util';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  register(): void {
    this.accountService.register(this.model).subscribe(
      (response) => {
        console.log(response);
        this.cancel();
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.error);
      }
    );
  }

  cancel(): void {
    this.cancelRegister.emit(false);
  }
}
