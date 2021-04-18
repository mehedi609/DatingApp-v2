import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((errorResponse) => {
        if (errorResponse) {
          const { error, status } = errorResponse;
          switch (status) {
            case 400:
              if (error.errors) {
                const modalStateErrors = [];
                const { errors } = error;

                for (const key in errors) {
                  if (errors[key]) {
                    modalStateErrors.push(errors[key]);
                  }
                }
                // @ts-ignore
                throw modalStateErrors.flat();
              } else {
                this.toastr.error('Bad Request', status);
              }
              break;
            case 401:
              this.toastr.error('Unauthorized', status);
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = { state: { error } };
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              this.toastr.error('Something unexpected went wrong!');
              console.log(errorResponse);
              break;
          }
        }
        return throwError(errorResponse);
      })
    );
  }
}
