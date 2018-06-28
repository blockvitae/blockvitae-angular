import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, 
  MatButtonModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatCardModule, 
  MatProgressSpinnerModule,
  MatChipsModule,
  MatTooltipModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  exports : [
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  declarations: []
})
export class MaterialModule { }
