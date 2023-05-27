import { Component, Input } from '@angular/core';
import { BookDto, MAX_RATING } from '../../models/Book';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent {
  @Input() book?: BookDto;
  @Input() handleDelete?: (id: string) => void;
  maxRating = MAX_RATING;
}
