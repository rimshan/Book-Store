import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';


import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  imports: [
    CommonModule ,
    FormsModule,
    ProfileRoutingModule,
    ChartsModule,
    DataTablesModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [ ProfileComponent ]
})
export class ProfileModule { }
