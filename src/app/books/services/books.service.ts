import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
} from '@angular/fire/firestore';
import { QueryClientService, UseMutation, UseQuery } from '@ngneat/query';
import { Observable, defer, from } from 'rxjs';
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
    //TODO
    return this.useQuery(this.getByIdKey(bookId), () => {
      const bookDocument = doc(this.store, this.collectionName);
      return docData(bookDocument, { idField: 'id' });
    });
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
}
