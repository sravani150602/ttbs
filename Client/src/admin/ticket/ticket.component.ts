import {Component, OnInit} from '@angular/core';
import {TicketType} from "../../types/ticket.type";
import {AdminService} from "../services/admin.service";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  tickets: TicketType[] = [];

  constructor(private as: AdminService) {
  }

  ngOnInit(): void {
    // this.tickets = JSON.parse(localStorage.getItem("tickets") as string) || []
    this.getAllTickets()
  }

  getAllTickets() {
    this.as.getAllTickets().then((r) => {
      this.tickets = r
    })
  }
}
