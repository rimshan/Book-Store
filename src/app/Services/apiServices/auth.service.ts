import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_URL } from "../../../configurations";
import { TokenStorage } from "../../shared/auth/token-storage";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url: string;
  private mockUrl: string;

  constructor(private http: HttpClient, private token: TokenStorage) {
    this.url = API_URL + "/";
  }

  authorLogin(username, password) {
    const data = {
      username: username,
      password: password,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "X-Skip-Interceptor": "",
        Authorization: "Basic " + btoa(username + ":" + password),
      }),
    };
    return this.http.post(this.url + "auth/login", data);
  }

  authorRegister(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "X-Skip-Interceptor": "",
        Authorization: "Basic ",
      }),
    };
    return this.http.post(this.url + "auth/register", user);
  }
}
