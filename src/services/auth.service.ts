import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.baseURL + '/accounts';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, public router: Router) { }

  login(data: any) {
    return this.http.post(this.url, data, this.httpOptions).pipe(
      tap(result => this.save_token(result)),
      catchError(error => throwError(() => `Something went wrong: ${error.message}`))
    );
  }

  save_token(data: any): void {
    localStorage.setItem('token', data.token)
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login'])
  }

  credentials(){
    return this.http.get(this.url)
  }
}
