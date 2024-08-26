import {Component, OnInit, ViewChild} from '@angular/core';
import {UserType} from "../../types/user.type";
import {Router} from "@angular/router";
import {CoreService} from "../services/core.service";
import {ToastComponent} from "../../shared/toast/toast.component";
import {ApiResponseType} from "../../types/api-response.type";
import {ProgressModalComponent} from "../../shared/progress-modal/progress-modal.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild(ToastComponent) toast!: ToastComponent;
  @ViewChild(ProgressModalComponent) prg!: ProgressModalComponent;

  registerData: UserType = {age: null, emailID: "", name: "", password: "", phone: null};

  users: UserType[] = []
  selectedGender: "Male" | "Female" | "Others" | "Select Gender" = "Select Gender";
  prgMsg: string = 'Registering user...';

  constructor(private router: Router, private cs: CoreService) {


  }

  ngOnInit() {
    this.users = JSON.parse(localStorage.getItem("users") as string) || []
  }

  onRegisterUser() {
    // this.router.navigate([''])
    this.prg.showModal()
    this.cs.register(this.registerData).subscribe((r: ApiResponseType) => {
      this.prg.hideModal()
      if (r.data) {
        this.toast.showToast('Registration', 'registration completed successfully', 'success')
        //TODO
        this.router.navigate([''])
      } else {
        this.toast.showToast('Registration', r.msg, 'danger')
      }
    }, (error) => {
      this.prg.hideModal()
      console.log(error)
      this.toast.showToast('Registration', error.message, 'danger')
    })
  }

  onGenderChange() {
    console.log(this.selectedGender);
    if (this.selectedGender != "Select Gender")
      this.registerData.gender = this.selectedGender
  }
}
