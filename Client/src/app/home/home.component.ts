import {Component, OnInit, ViewChild} from '@angular/core';
import {LoginType} from "../../types/login.type";
import {CoreService} from "../services/core.service";
import {ApiResponseType} from "../../types/api-response.type";
import {ToastComponent} from "../../shared/toast/toast.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild(ToastComponent) tc!: ToastComponent;

  constructor(private cs: CoreService, private router: Router) {
  }

  ngOnInit(): void {
  }

  loginUser($event: LoginType) {
    this.cs.login($event).subscribe((r: ApiResponseType) => {
      if (r.data) {
        this.tc.showToast('Login', r.msg, 'success')
        localStorage.setItem("user", JSON.stringify(r.data))
        this.router.navigate(['home']).then((r) => {
          console.log('user navigated')
        })
      } else
        this.tc.showToast('Login', r.msg, 'danger')
    }, (error) => {
      this.tc.showToast('Login', error.message, 'danger')
      console.log(error)
    })
  }
}
