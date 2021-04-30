import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  busyRequestCounter = 0;

  constructor(private spinnerService: NgxSpinnerService) {}

  busy(): any {
    this.busyRequestCounter++;
    this.spinnerService.show(undefined, {
      type: 'line-scale-party',
      bdColor: 'rbga(255,255,255,0)',
      color: '#333333',
    });
  }

  idle(): any {
    this.busyRequestCounter--;
    if (this.busyRequestCounter <= 0) {
      this.busyRequestCounter = 0;
      this.spinnerService.hide();
    }
  }
}
