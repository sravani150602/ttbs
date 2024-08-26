import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginType} from "../../types/login.type";
import {Router} from "@angular/router";
import {UserType} from "../../types/user.type";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() onLogin = new EventEmitter<LoginType>();

  loginData: LoginType = {emailID: "", password: ""}

  users: UserType[] = []

  constructor() {
  }

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem("users") as string) || []
  }

  onLoginBtnClicked() {
    this.onLogin.emit(this.loginData)
  }


}

