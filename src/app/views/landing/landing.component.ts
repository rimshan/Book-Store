import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { BooksService } from "../../Services/apiServices/books.service";
import { GlobleService } from "../../Services/globle.service";
import { TokenStorage } from "../../shared/auth/token-storage";
import { ModalDirective } from "ngx-bootstrap/modal";
//import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";

import { Book } from "../../models/book.model";

@Component({
  templateUrl: "landing.component.html",
})
export class LandingComponent implements OnDestroy, OnInit {
  constructor(
    public route: Router,
    private booksService: BooksService,
    private token: TokenStorage,
    private globalService: GlobleService
  ) {}

  dtOptions: DataTables.Settings = {};

  public bookss: any;
  public books: Array<any> = [];
  book: Book;
  message: any;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "simple_numbers",
      pageLength: 10,
      paging: true,
      destroy: true,
    };
    this.getAllBooks();

    this.dtTrigger.next();
  }

  getAllBooks(): void {
    this.booksService.getAllBooks().subscribe(
      (data) => {
        this.bookss = data;
        this.books = this.bookss.data;
        this.dtOptions = {
          pagingType: "simple_numbers",
          pageLength: 10,
          paging: true,
          destroy: true,
        };

        this.dtTrigger.next();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
