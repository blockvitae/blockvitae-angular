import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, 
  MatButtonModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatCardModule, 
  MatProgressSpinnerModule,
  MatChipsModule,
  MatTooltipModule} from '@angular/material';

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
    MatTooltipModule
  ],
  exports : [
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatTooltipModule
  ],
  declarations: []
})
export class MaterialModule { }
