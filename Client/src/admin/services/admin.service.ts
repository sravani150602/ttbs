import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {LoginType} from "../../types/login.type";
import {ApiResponseType} from "../../types/api-response.type";
import {TrainType} from "../../types/train.type";
import {TicketType} from "../../types/ticket.type";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  API = environment.API

  constructor(private http: HttpClient) {
  }

  loginAdmin(data: LoginType) {
    return this.http.post<ApiResponseType>(this.API + 'admin/login', data)
  }

  getTrainID() {
    return this.http.get<ApiResponseType>(this.API + 'train/getID')
  }

  getAllTrains() {
    return this.http.get<ApiResponseType>(this.API + 'train')
  }

  addTrain(data: TrainType) {
    return this.http.post<ApiResponseType>(this.API + 'train', data)
  }

  cancelTrain(data: TrainType) {
    return this.http.post<ApiResponseType>(this.API + 'train/cancelTrain', data)
  }

  updateTrain(data: TrainType) {
    return this.http.put<ApiResponseType>(this.API + 'train', data)
  }

  getAllTickets(): Promise<TicketType[]> {
    return new Promise<TicketType[]>((resolve, reject) => {
      this.getAllTrains().subscribe((tr) => {
        let trains: TrainType[] = tr.data
        let tickets: TicketType[] = []
        this.http.get<ApiResponseType>(this.API + 'ticket').subscribe((ti) => {
          ti.data.forEach((t: TicketType, i: number) => {
            t.train = trains.filter((tr) => t.trainID === tr.trainID)[0]
            tickets.push(t)
            if (tickets.length === i + 1) resolve(tickets)
          })
        })
      })
    })
  }

}
