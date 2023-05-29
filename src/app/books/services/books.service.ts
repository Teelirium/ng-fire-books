import { Injectable, inject } from '@angular/core';
import {
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  updateDoc,
} from '@angular/fire/firestore';
import { QueryClientService, UseMutation, UseQuery } from '@ngneat/query';
import { Observable, defer, from, map } from 'rxjs';
import { BookDto, BookFormDto } from '../models/Book';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private store = inject(Firestore);
  private useQuery = inject(UseQuery);
  private useMutation = inject(UseMutation);
  private queryClient = inject(QueryClientService);

  collectionName = 'books';

  getAllKey() {
    return ['books'];
  }

  getAll() {
    return this.useQuery(
      this.getAllKey(),
      () => {
        const bookCollection = collection(this.store, this.collectionName);
        return collectionData(bookCollection, {
          idField: 'id',
        }) as Observable<BookDto[]>;
      },
      { staleTime: 5 * 60 * 1000 }
    );
  }

  getByIdKey(id: string) {
    return ['books', id];
  }

  getById(bookId: string) {
    return this.useQuery(
      this.getByIdKey(bookId),
      () => {
        const bookDocument = doc(this.store, this.collectionName, bookId);
        return docData(bookDocument, { idField: 'id' }) as Observable<BookDto>;
      },
      { enabled: bookId !== '', staleTime: 5 * 60 * 1000 }
    );
  }

  addBook() {
    return this.useMutation(
      (book: BookFormDto) => {
        const bookCollection = collection(this.store, this.collectionName);
        return defer(() => from(addDoc(bookCollection, book)));
      },
      {
        onSuccess: () => {
          this.queryClient.invalidateQueries(this.getAllKey());
        },
      }
    );
  }

  editBook() {
    return this.useMutation(
      (book: BookDto) => {
        const bookDocument = doc(
          this.store,
          this.collectionName,
          book.id
        ) as DocumentReference<BookDto>;
        return defer(() => from(updateDoc<BookDto>(bookDocument, book)));
      },
      {
        onSuccess: (_, vars) => {
          this.queryClient.invalidateQueries(this.getAllKey());
          this.queryClient.invalidateQueries(this.getByIdKey(vars.id));
        },
      }
    );
  }

  deleteBook() {
    return this.useMutation(
      (bookId: string) => {
        const bookDocument = doc(this.store, this.collectionName, bookId);
        return defer(() => from(deleteDoc(bookDocument)));
      },
      {
        onSuccess: (_, bookId) => {
          this.queryClient.invalidateQueries(this.getAllKey());
          this.queryClient.invalidateQueries(this.getByIdKey(bookId));
        },
      }
    );
  }
}
