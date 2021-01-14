import {EventEmitter, Injectable, Output} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class GlobleService {
    @Output() incomingRequestEvent: EventEmitter<string> = new EventEmitter();
    constructor(public toastr: ToastrService, private http: HttpClient ) { }

    // notification change
    getSuccessNotifyOptions(message: any) {
      console.log(message)
        this.toastr.success(message, 'Success!');
    }

    getErrorNotifyOptions(message: any) {
        this.toastr.error(message, 'Fail!');
    }

    getErrorNotifyLogin(message: any) {
        this.toastr.error(message, 'Invalid Login');
    }
}

