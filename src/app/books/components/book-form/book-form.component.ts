import { Component, Input, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
  BookDto,
  BookFormDto,
  BookFormValue,
  MAX_RATING,
} from 'src/app/books/models/Book';
import { BooksService } from '../../services/books.service';
import { isValidISBN } from '../../util/isValidISBN';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent {
  @Input() bookId: string | null = null;

  private booksService = inject(BooksService);
  private router = inject(Router);

  addBookMutation = this.booksService.addBook();
  editBookMutation = this.booksService.editBook();

  existingBookQuery$ = this.booksService.getById(this.bookId ?? '').result$;
  private unsub$ = new Subject<void>();

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
    authors: new FormArray([this.createAuthorFormControl()]),
    ISBN: new FormControl('', [
      (ctrl: AbstractControl<string | null>): ValidationErrors | null => {
        if (!ctrl.value) return null;

        const result = isValidISBN(ctrl.value.split('-'));
        return result ? null : { invalid: true };
      },
    ]),
  });

  ngOnInit() {
    this.existingBookQuery$ = this.booksService.getById(
      this.bookId ?? ''
    ).result$;
    this.existingBookQuery$.pipe(takeUntil(this.unsub$)).subscribe((res) => {
      if (res.data) {
        const formData = this.toFormData(res.data);
        this.bookForm.controls.authors.clear();
        for (const _ of formData.authors) {
          this.bookForm.controls.authors.push(this.createAuthorFormControl());
        }
        this.bookForm.setValue(formData);
      }
    });
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

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

    console.log('Submitting book:', newBook);

    if (this.bookId) {
      this.editBookMutation.mutate({ ...newBook, id: this.bookId });
      return;
    }

    this.addBookMutation.mutate(newBook).then((doc) => {
      this.router.navigate([`/`], { fragment: doc.id });
    });
  }

  addAuthor() {
    this.bookForm.controls.authors.push(this.createAuthorFormControl());
  }

  removeAuthor(index: number) {
    this.bookForm.controls.authors.removeAt(index);
  }

  private toFormData(book: BookDto | BookFormDto): BookFormValue {
    const value = {
      title: book.title,
      authors: book.authors,
      year: book.year,
      rating: book.rating,
      ISBN: book.ISBN?.join('-') ?? null,
    } satisfies BookFormValue;
    return value;
  }

  private createAuthorFormControl() {
    return new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    });
  }
}
