import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookDto, MAX_RATING } from '../../models/Book';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent {
  @Input() book?: BookDto;
  @Input() showDelete: boolean = false;
  @Output() handleDelete = new EventEmitter<string>();
  maxRating = MAX_RATING;

  deleteBook(bookId: string) {
    this.handleDelete.emit(bookId);
  }
}
