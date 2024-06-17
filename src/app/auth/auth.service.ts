import {inject,  Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, tap, throwError} from "rxjs";
import {TokenResponse} from "./auth.interface";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  baseApiUrl = 'https://icherniakov.ru/yt-course/auth'
  cookieService = inject(CookieService)
  token: string | null = null
  refreshToken: string | null = null
  router = inject(Router)
    get isAuth(): boolean {
    if(!this.token) {
      this.token = this.cookieService.get('token')
      this.refreshToken = this.cookieService.get('refresh_token')
    }
    console.log(this.token, 'token')
       return !!this.token;
    }


  login(payload: {
    username: string,
    password: string
  } ) {
      const formData = new FormData();
      formData.append('username', payload.username);
      formData.append('password', payload.password);
      return this.http.post<TokenResponse>(`${this.baseApiUrl}/token`, formData).pipe(
        tap((val) => this.saveTokens(val)),
      )
  }

  refreshAuthToken() {
    return this.http.post<TokenResponse>(`${this.baseApiUrl}/refresh`, {
      refresh_token: this.refreshToken
    }).pipe(
      tap((val) => this.saveTokens(val)),
      catchError(error => {
        this.logout()
        return throwError(error);
      })
    )
  }

  logout() {
    this.cookieService.deleteAll()
    this.refreshToken = null
    this.token = null
    this.router.navigate(['/login'])
  }

  saveTokens(res: TokenResponse) {
    this.token = res.access_token;
    this.refreshToken = res.refresh_token;
    this.cookieService.set('token',this.token);
    this.cookieService.set('refresh_token',this.refreshToken);
  }

}
