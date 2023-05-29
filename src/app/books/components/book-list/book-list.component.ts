import { Component, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BooksService } from 'src/app/books/services/books.service';
import { randomInt } from 'src/app/shared/util/randomInt';
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

  recommendedBook?: BookDto;

  deleteBookMutation = this.booksService.deleteBook();

  private unsub$ = new Subject<void>();

  ngOnInit() {
    this.books$.pipe(takeUntil(this.unsub$)).subscribe((books) => {
      if (!books.data) {
        return;
      }
      const currentYear = new Date().getFullYear();
      const oldEnough = books.data.filter((book) => {
        if (!book.year) return true;
        return currentYear - book.year >= 3;
      });
      const maxRating = oldEnough.reduce(
        (prev, curr) =>
          curr.rating !== null && curr.rating > prev ? curr.rating : prev,
        0
      );
      const recommended = oldEnough.filter((b) => b.rating === maxRating);
      this.recommendedBook = recommended[randomInt(recommended.length)];
    });
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

  deleteBook(bookId: string) {
    this.deleteBookMutation.mutate(bookId);
  }
}
