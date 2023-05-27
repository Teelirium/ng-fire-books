import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookCardComponent } from './books/components/book-card/book-card.component';
import { BookListComponent } from './books/components/book-list/book-list.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { BlurryBgComponent } from './shared/components/blurry-bg/blurry-bg.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { GroupByPipe } from './shared/pipes/group-by.pipe';
import { SortByPipe } from './shared/pipes/sort-by.pipe';
import { SortPipe } from './shared/pipes/sort.pipe';
@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    ListPageComponent,
    HeaderComponent,
    GroupByPipe,
    SortPipe,
    SortByPipe,
    BookCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    BlurryBgComponent,
    SpinnerComponent,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
