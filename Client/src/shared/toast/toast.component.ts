import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Toast} from 'bootstrap'

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements AfterViewInit, OnInit {

  title: string = 'Toast Header';
  msg: string = 'Toast Message';

  toast!: Toast;
  type: string = 'success';

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.toast = new Toast(document.getElementById('toast') as HTMLElement)
  }

  showToast(_title: string, _msg: string, _type: string) {
    this.title = _title
    this.msg = _msg
    this.type = _type
    this.toast.show()
  }


}
