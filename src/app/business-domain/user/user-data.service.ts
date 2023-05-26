import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, retry, Subscription } from 'rxjs';

const sessionStorageKey = 'gallery_jwt';

@Injectable({
    providedIn: 'root'
})
export class UserDataService {
    constructor(
        private readonly httpClient: HttpClient,
    ) {
        const token = window.localStorage.getItem(
            sessionStorageKey);
        if (token) {
            this.restore(token);
        }
    }

    public isLoggedIn$ = new BehaviorSubject(false);
    public jwtToken = '';

    public register(payload: {email: string, name: string}): Subscription {
        return this.httpClient.post<{ token: string }>(
            '/api/register',
            payload
        ).pipe(retry(1)).subscribe((response: { token: string }) => {
                this.restore(response.token);
            }
        );
    }

    private restore(token: string): void {
        this.jwtToken = token;
        this.isLoggedIn$.next(true);
        window.localStorage.setItem(sessionStorageKey, token);
    }
}
