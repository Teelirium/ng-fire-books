import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BookFormComponent } from 'src/app/books/components/book-form/book-form.component';
import { BlurryBgComponent } from 'src/app/shared/components/blurry-bg/blurry-bg.component';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { AddPageRoutingModule } from './add-page-routing.module';
import { AddPageComponent } from './add-page.component';

@NgModule({
  declarations: [AddPageComponent, BookFormComponent],
  imports: [
    CommonModule,
    AddPageRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerComponent,
    BlurryBgComponent,
    MatButtonModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
})
export class AddPageModule {}
