import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { BooksService } from 'src/app/books/services/books.service';
import { BookDto, MAX_RATING } from '../../models/Book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent {
  maxRating = MAX_RATING;
  private booksService = inject(BooksService);
  books$ = this.booksService.getAll().result$;
  deleteBookMutation = this.booksService.deleteBook();

  ngOnInit() {}

  deleteBook(bookId: string) {
    this.deleteBookMutation.mutate(bookId);
  }
}
