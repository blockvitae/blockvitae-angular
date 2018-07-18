import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '../../../../../../node_modules/@angular/material';
import { Blockvitae } from '../../../../interfaces/interface';

@Component({
  selector: 'app-publication-dialog',
  templateUrl: './publication-dialog.component.html',
  styleUrls: ['./publication-dialog.component.scss']
})
export class PublicationDialogComponent{

  constructor(
    @Inject(MAT_DIALOG_DATA) public userPublication: Blockvitae.UserPublication
  ) { }

}
