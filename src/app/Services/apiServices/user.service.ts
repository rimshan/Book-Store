import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpEventType,
} from "@angular/common/http";
import { API_URL } from "../../../configurations";
import { TokenStorage } from "../../shared/auth/token-storage";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private url: string;
  private mockUrl: string;

  constructor(private http: HttpClient, private token: TokenStorage) {
    this.url = API_URL + "/";
  }

  getUser() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token.getToken(),
      }),
    };
    return this.http.get(this.url + "user", httpOptions);
  }

  updateUser(user, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token.getToken(),
      }),
    };
    return this.http.put(this.url + `user/${id}`, user, httpOptions);
  }
}
