import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BookFormDto, MAX_RATING } from 'src/app/books/models/Book';
import { BooksService } from '../../services/books.service';
import { isValidISBN } from '../../util/isValidISBN';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent {
  private booksService = inject(BooksService);
  private router = inject(Router);
  addBookMutation = this.booksService.addBook();

  bookForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    year: new FormControl<number | null>(null, {
      validators: [
        Validators.max(new Date().getFullYear()),
        Validators.min(1800),
      ],
    }),
    rating: new FormControl<number | null>(null, {
      validators: [Validators.max(MAX_RATING), Validators.min(0)],
    }),
    authors: new FormArray([
      new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    ]),
    ISBN: new FormControl('', [
      (ctrl: AbstractControl<string>): ValidationErrors | null => {
        const result = isValidISBN(ctrl.value.split('-'));
        return result ? null : { invalid: true };
      },
    ]),
  });

  onSubmit() {
    if (this.bookForm.invalid) {
      return;
    }
    const value = this.bookForm.value;
    const newBook = {
      title: value.title!,
      authors: value.authors!,
      year: value.year ?? null,
      rating: value.rating ?? null,
      ISBN: value.ISBN ? value.ISBN.split('-') : null,
    } satisfies BookFormDto;

    console.log(newBook);

    this.addBookMutation.mutate(newBook).then(() => {
      this.router.navigate(['/']);
    });
  }

  addAuthor() {
    this.bookForm.controls.authors.push(
      new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      })
    );
  }

  removeAuthor(index: number) {
    this.bookForm.controls.authors.removeAt(index);
  }
}
