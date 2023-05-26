import { Component, inject } from '@angular/core';
import { BooksService } from 'src/app/books/services/books.service';
import { BookDto, MAX_RATING } from '../../models/Book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent {
  private booksService = inject(BooksService);
  books$ = this.booksService.getAll().result$;
  maxRating = MAX_RATING;
}
