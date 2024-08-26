import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {TrainType} from "../../types/train.type";
import {Modal} from 'bootstrap'
import {NgForm} from "@angular/forms";
import {AdminService} from "../services/admin.service";


@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent implements OnInit, AfterViewInit {
  @ViewChild('form') addTrainForm!: NgForm;
  @Output() tc: EventEmitter<any> = new EventEmitter<any>()

  trainData: TrainType = {
    journeyTime: null, stops: null,
    ticketFare: null,
    id: 0,
    destination: "",
    endTime: '',
    name: "",
    start: "",
    startTime: "",
    status: true,
    trainID: "T67540"
  }

  trains: TrainType[] = []

  addTrainModal!: Modal;

  updateFlag: boolean = false

  constructor(private as: AdminService) {
  }

  ngOnInit(): void {
    // this.trains = JSON.parse(localStorage.getItem("trains") as string) || []
    this.getTrains()
  }

  ngAfterViewInit() {
    this.addTrainModal = new Modal('#addTrainModal', {keyboard: false})
  }

  getTrains() {
    this.as.getAllTrains().subscribe((r) => {
      this.trains = r.data
      // this.tc.emit({title: 'Train Management', msg: 'loaded train data', type: 'success'})
    })
  }

  onUpdateTrain(train: TrainType) {
    this.trainData = train
    this.updateFlag = true
    this.trainData.startTime = new Date(this.trainData.startTime).toISOString().slice(0, 16)
    this.trainData.endTime = new Date(this.trainData.endTime).toISOString().slice(0, 16)
    this.addTrainModal.show()
  }

  onSave() {
    if (this.updateFlag) this.onUpdateTrainSave()
    else this.onAddTrainSave()
  }

  onAddTrain() {
    this.as.getTrainID().subscribe((r) => {
      this.trainData.trainID = r.data
    })
    this.updateFlag = false
    this.clearData()
    this.addTrainModal.show()
  }

  onAddTrainSave() {
    this.as.addTrain(this.trainData).subscribe((r) => {
      if (r.data) {
        this.tc.emit({title: 'Train Management', msg: r.msg, type: 'success'})
        this.getTrains()
      } else {
        this.tc.emit({title: 'Train Management', msg: r.msg, type: 'danger'})
      }
    }, (error) => {
      this.tc.emit({title: 'Train Management', msg: error, type: 'danger'})
    })
    this.addTrainModal.hide()
    this.clearData()
  }

  onUpdateTrainSave() {
    this.as.updateTrain(this.trainData).subscribe((r) => {
      if (r.data)
        this.tc.emit({title: 'Train Management', msg: r.msg, type: 'success'})
      else this.tc.emit({title: 'Train Management', msg: r.msg, type: 'danger'})
      this.getTrains()
    }, (err) => this.tc.emit({title: 'Train Management', msg: err, type: 'danger'}))
    this.addTrainModal.hide()
    this.clearData()
  }

  cancelTrain(train: TrainType) {
    this.as.cancelTrain(train).subscribe((r) => {
      if (r.data)
        this.tc.emit({title: 'Train Management', msg: r.msg, type: 'success'})
      else this.tc.emit({title: 'Train Management', msg: r.msg, type: 'danger'})
      this.getTrains()
    }, (err) => this.tc.emit({title: 'Train Management', msg: err, type: 'danger'}))
  }

  getAvailableTrains(trains: TrainType[]) {
    return trains.filter((t) => t.status)
  }

  clearData() {
    this.trainData = {
      journeyTime: null, stops: null,
      ticketFare: null,
      id: 0,
      destination: "",
      endTime: '',
      name: "",
      start: "",
      startTime: "",
      status: true,
      trainID: "T67540"
    }
  }

}
