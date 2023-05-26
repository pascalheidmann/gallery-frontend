import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDataService } from './user-data.service';

@Injectable()
export class JwtHttpInterceptor implements HttpInterceptor {
    constructor(private readonly userDataService: UserDataService) {}

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const JWT_AUTH = this.userDataService.jwtToken;
        if (!JWT_AUTH) {
            return next.handle(httpRequest);
        }

        return next.handle(httpRequest.clone({ setHeaders: { JWT_AUTH } }));
    }
}
