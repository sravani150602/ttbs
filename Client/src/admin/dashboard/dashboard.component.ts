import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {LoginType} from "../../types/login.type";
import {AdminService} from "../services/admin.service";
import {ToastComponent} from "../../shared/toast/toast.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(ToastComponent) tc!: ToastComponent

  title: string = 'Admin Dashboard';

  isAdmin: boolean = false;
  loginData: LoginType = {emailID: "", password: ""};

  constructor(private router: Router, private as: AdminService) {
  }

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('isAdmin') === 'true'
  }

  logout() {
    localStorage.setItem('isAdmin', 'false')
    this.isAdmin = false
    // this.router.navigate(['/'])
  }

  onLoginBtnClicked(ev: LoginType) {
    this.as.loginAdmin(ev).subscribe((r) => {
      if (r.data) {
        this.isAdmin = true
        localStorage.setItem('isAdmin', 'true')
        this.tc.showToast('Admin Login', r.msg, 'success')
      } else {
        this.tc.showToast('Admin Login', r.msg, 'danger')
      }
    }, (error) => {
      this.tc.showToast('Admin Login', error.message, 'danger')
    })

  }

  showToast(d: any) {
    this.tc.showToast(d.title, d.msg, d.type)
  }
}
