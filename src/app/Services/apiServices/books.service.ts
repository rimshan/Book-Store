import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpEventType,
} from "@angular/common/http";
import { API_URL } from "../../../configurations";
import { TokenStorage } from "../../shared/auth/token-storage";
// import { Signup } from "../../models/signup.model";
// import { User } from "../../models/user.model";
// import {GlobleService} from  "./globle.service";
// import { Observable } from "rxjs/Observable";
// import { forkJoin } from "rxjs/observable/forkJoin";

@Injectable({
  providedIn: "root",
})
export class BooksService {
  private url: string;
  private mockUrl: string;

  constructor(private http: HttpClient, private token: TokenStorage) {
    this.url = API_URL + "/";
  }

  getBooks() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token.getToken(),
      }),
    };
    return this.http.get(this.url + "books", httpOptions);
  }

  getAllBooks() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token.getToken(),
      }),
    };
    return this.http.get(this.url + "books-all", httpOptions);
  }

  createBook(book) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token.getToken(),
      }),
    };
    return this.http.post(this.url + `book`, book, httpOptions);
  }

  updateBook(book, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token.getToken(),
      }),
    };
    return this.http.put(this.url + `book/${id}`, book, httpOptions);
  }
}
