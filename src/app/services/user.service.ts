import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetUserInfo } from '../types/main';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3000/api/user';

  constructor(
    private _http: HttpClient,
  ) { }

  public getMyInfo(): Observable<GetUserInfo> {
    return this._http.get<GetUserInfo>(`${this.url}/me`,
    //   {
    //   headers: new HttpHeaders({
    //     'Authorization': 'Bearer ' + localStorage.getItem('jwt_token'),
    //   }),
    // }
    );
  }
}
