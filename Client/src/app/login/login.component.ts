import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginType} from "../../types/login.type";
import {Router} from "@angular/router";
import {UserType} from "../../types/user.type";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  @Output() onLogin = new EventEmitter<LoginType>();

  loginData: LoginType = {emailID: "", password: ""}

  users: UserType[] = []

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem("users") as string) || []
  }

  onLoginBtnClicked() {
    this.onLogin.emit(this.loginData)
    this.router.navigate(['home'])
    this.users.forEach((u, i) => {
      if (u.emailID === this.loginData.emailID && u.password === this.loginData.password) {
        this.router.navigate(['home'])
      }
      if (this.users.length === i + 1) {
        console.log('invalid email or password')
      }
    })
  }


}

