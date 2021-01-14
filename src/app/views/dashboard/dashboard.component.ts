import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BooksService } from "../../Services/apiServices/books.service";
import { GlobleService } from "../../Services/globle.service";
import { TokenStorage } from "../../shared/auth/token-storage";
import { ModalDirective } from "ngx-bootstrap/modal";
//import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";

import { Book } from "../../models/book.model";

@Component({
  templateUrl: "dashboard.component.html",
})
export class DashboardComponent implements OnDestroy, OnInit {
  @ViewChild("addBookModal") public addBookModal: ModalDirective;
  @ViewChild("editBookModal") public editBookModal: ModalDirective;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  constructor(
    public route: Router,
    private booksService: BooksService,
    private token: TokenStorage,
    private globalService: GlobleService,
    private formBuilder: FormBuilder
  ) {}

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  addBookForm: FormGroup;
  editBookForm: FormGroup;
  submitted = false;
  public bookss: any;
  public books: Array<any> = [];
  book: Book;
  message: any;

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "simple_numbers",
      pageLength: 10,
      paging: true,
      destroy: true,
    };
    this.getAuthorBooks();
    this.addBookForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });
    this.editBookForm = this.formBuilder.group({
      id: ["", [Validators.required]],
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  get f() {
    return this.addBookForm.controls;
  }

  get e() {
    return this.editBookForm.controls;
  }

  getAuthorBooks(): void {
    this.booksService.getBooks().subscribe(
      (data) => {
        this.bookss = data;
        this.books = this.bookss.data;
        this.dtOptions = {
          pagingType: "simple_numbers",
          pageLength: 10,
          paging: true,
          destroy: true,
        };
        this.rerender();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onAddNewButtonClick() {
    this.addBookModal.show();
  }

  onEditButtonClick(book) {
    this.editBookModal.show();
    this.editBookForm.controls["id"].setValue(book.id);
    this.editBookForm.controls["title"].setValue(book.title);
    this.editBookForm.controls["description"].setValue(book.description);
  }

  onHideModal() {
    this.book = new Book();
    this.addBookForm.reset();
    this.submitted = false;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addBookForm.invalid) {
      return;
    }

    this.booksService.createBook(this.addBookForm.value).subscribe(
      (data) => {
        this.message = data;
        if (this.message.message) {
          this.globalService.getSuccessNotifyOptions(this.message.message);
          this.addBookModal.hide();

          this.getAuthorBooks();
        }
      },
      (error) => {
        this.globalService.getErrorNotifyLogin(
          "Somthing went wrong please try again"
        );
      }
    );
  }

  onEditSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editBookForm.invalid) {
      return;
    }

    this.booksService
      .updateBook(this.editBookForm.value, this.editBookForm.value.id)
      .subscribe(
        (data) => {
          this.message = data;
          if (this.message.message) {
            this.globalService.getSuccessNotifyOptions(this.message.message);
            this.editBookModal.hide();
            this.onHideModal();
            this.getAuthorBooks();
          }
        },
        (error) => {
          this.globalService.getErrorNotifyLogin(
            "Somthing went wrong please try again"
          );
        }
      );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
