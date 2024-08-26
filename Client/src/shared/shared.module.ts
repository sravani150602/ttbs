import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProgressModalComponent} from './progress-modal/progress-modal.component';
import {ToastComponent} from './toast/toast.component';
import {LoginComponent} from "./login/login.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ProgressModalComponent,
    ToastComponent, LoginComponent
  ],
  imports: [
    CommonModule, FormsModule
  ], exports: [LoginComponent, ToastComponent, ProgressModalComponent]
})
export class SharedModule {
}
