import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';


import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  imports: [
    CommonModule ,
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    DataTablesModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
