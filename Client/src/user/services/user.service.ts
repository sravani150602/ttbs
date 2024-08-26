import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {ApiResponseType} from "../../types/api-response.type";
import {TicketType} from "../../types/ticket.type";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API = environment.API

  constructor(private http: HttpClient) {

  }

  getAllTrains() {
    return this.http.get<ApiResponseType>(this.API + 'train')
  }

  bookTrain(data: TicketType) {
    return this.http.post<ApiResponseType>(this.API + 'ticket', data)
  }

  getUserTickets(id: string) {
    return this.http.post<ApiResponseType>(this.API + 'ticket/getTicketsByUser', {user: id})
  }

  cancelTicket(data: TicketType) {
    return this.http.post<ApiResponseType>(this.API + 'ticket/cancelTicket', data)
  }
}
