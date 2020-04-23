import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

const materialModules = [
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatGridListModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonToggleModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, materialModules, ReactiveFormsModule],
  exports: [materialModules, ReactiveFormsModule],
})
export class SharedModule {}
