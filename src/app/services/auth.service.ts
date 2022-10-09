import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, SimpleRequest } from '../types/main';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:3000/api/auth';

  constructor(private _http: HttpClient) { }

  public validation(event: Event) {
    const target = event.target as HTMLInputElement
    if (!target.value.trim()) {
      target.style.border = '2px solid #ef4444';
      target.style.outlineColor = '#f87171';
    } else {
      target.style.border = '2px solid rgb(229 231 235)';
      target.style.outlineColor = '#e5e7eb'
    }
  }

  public getToken(): Observable<LoginRequest> {
    return this._http.get<LoginRequest>(`${this.url}/token`);
  }

  public register(name: string, surname: string, email: string, password: string, method: string = 'common', id?: string): Observable<SimpleRequest> {
    return this._http.post<SimpleRequest>(`${this.url}/register`, {
      id,
      name,
      surname,
      email,
      password,
      method,
    })
  }

  public login(email: string, password: string): Observable<LoginRequest> {
    return this._http.post<LoginRequest>(`${this.url}/login`, { email, password });
  }

  public logout(): Observable<SimpleRequest> {
    return this._http.get<SimpleRequest>(`${this.url}/logout`);
  }
}
