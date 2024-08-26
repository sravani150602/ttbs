import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginType} from "../../types/login.type";
import {environment} from "../../environments/environment.development";
import {UserType} from "../../types/user.type";
import {ApiResponseType} from "../../types/api-response.type";

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  API = environment.API

  constructor(private http: HttpClient) {
  }

  login(data: LoginType) {
    return this.http.post<ApiResponseType>(this.API + 'user/login', data)
  }

  register(data: UserType) {
    return this.http.post<ApiResponseType>(this.API + 'user', data)
  }
}
