import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TrainComponent } from './train/train.component';
import { TicketComponent } from './ticket/ticket.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    DashboardComponent,
    TrainComponent,
    TicketComponent,
    DashboardHomeComponent
  ],
	imports: [
		CommonModule,
		AdminRoutingModule,
		FormsModule,
		SharedModule
	]
})
export class AdminModule { }
