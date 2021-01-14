import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';

import { LandingComponent } from './landing.component';
import { LandingRoutingModule } from './landing-routing.module';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  imports: [
    CommonModule ,
    FormsModule,
    LandingRoutingModule,
    ChartsModule,
    DataTablesModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot()
  ],
  declarations: [ LandingComponent ]
})
export class LandingModule { }
