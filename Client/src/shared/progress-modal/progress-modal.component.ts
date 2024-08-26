import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Modal} from "bootstrap";

@Component({
  selector: 'app-progress-modal',
  templateUrl: './progress-modal.component.html',
  styleUrls: ['./progress-modal.component.css']
})
export class ProgressModalComponent implements OnInit, AfterViewInit {

  @Input() msg: string = 'Loading...';
  @Input() showBtn: boolean = false
  @Input() prgBtnTxt: string = 'OK';
  @Input() warn: boolean = false;
  @Output() btnClick: EventEmitter<any> = new EventEmitter<any>();

  modal!: Modal;


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.modal = new Modal('#modal')
    // this.modal.show()
  }

  showModal() {
    this.modal.show()
  }

  hideModal() {
    console.log('this.hideModal()')
    this.modal.hide()
  }

  onBtnClick() {
    this.btnClick.emit()
  }
}
