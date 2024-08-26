import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TrainType} from "../../types/train.type";
import {TicketType} from "../../types/ticket.type";
import {ToastComponent} from "../../shared/toast/toast.component";
import {ProgressModalComponent} from "../../shared/progress-modal/progress-modal.component";
import {Router} from "@angular/router";
import {UserType} from "../../types/user.type";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild(ToastComponent) tc!: ToastComponent;
  @ViewChild(ProgressModalComponent) pc!: ProgressModalComponent;
  trains: TrainType[] = []
  tickets: TicketType[] = []
  searchTxt: string = '';
  user: UserType = {age: 0, emailID: "", name: "", password: "", phone: 0};

  ticket: TicketType = {
    bookedAt: "", _id: "", train: {
      destination: "",
      endTime: '',
      name: "",
      start: "",
      startTime: '',
      status: true,
      trainID: "T67540",
      id: 0, ticketFare: 0, journeyTime: 0, stops: 0
    }
  }

  availableTrains: TrainType[] = []
  selectedTicket!: TicketType
  prgMsg: string = 'Are you sure you want to cancel the ticket'

  constructor(private router: Router, private us: UserService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user") as string)
    this.getAllTrains()
    this.getMyTickets()
  }

  ngAfterViewInit() {
    // this.pc.showModal()
  }

  getAllTrains() {
    this.us.getAllTrains().subscribe((r) => {
      this.trains = r.data
      this.availableTrains = this.trains
    })
  }

  onSearch() {
    this.availableTrains = this.trains.filter(
      (t) =>
        t.name.toLowerCase().includes(this.searchTxt.toLowerCase()
        ))
  }

  bookTicket(t: TrainType) {
    let _ticket: TicketType = {
      bookedAt: new Date().toISOString().slice(0, 16), trainID: t.trainID, user: this.user._id
    }
    this.us.bookTrain(_ticket).subscribe((r) => {
      if (r.data) {
        this.tc.showToast('Ticket Booking', 'Ticket booked successfully', 'success')
        this.getMyTickets()
      } else {
        this.tc.showToast('Ticket Booking', r.msg, 'danger')
      }
    }, (error) => {
      this.tc.showToast('Ticket Booking', error, 'danger')
    })
  }

  getMyTickets() {
    let _tickets: TicketType[] = []
    this.us.getUserTickets(this.user._id).subscribe((r) => {
      r.data.forEach((t: TicketType, i: number) => {
        t.train = this.trains.filter((tr) => tr.trainID === t.trainID)[0]
        _tickets.push(t)
        if (r.data.length === i + 1) this.tickets = _tickets
      })
    })
  }

  onCancelTicket(ticket: TicketType) {
    this.selectedTicket = ticket
    this.pc.showModal()
  }

  cancelTicket() {
    this.pc.hideModal()
    this.us.cancelTicket(this.selectedTicket).subscribe((r) => {
      if (r.data) {
        this.tc.showToast('Ticket Booking', r.msg, 'success')
        this.getMyTickets()
      } else {
        this.tc.showToast('Ticket Booking', r.msg, 'danger')
      }
    }, (error) => {
      this.tc.showToast('Ticket Booking', error, 'danger')
    })
  }

  onLogout() {
    localStorage.removeItem("user")
    this.router.navigate(['/']).then((r) => {
      console.log('logging out, redirecting to main page')
    })
  }
}
