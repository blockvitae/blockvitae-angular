import { Component, Inject } from '@angular/core';
import { Blockvitae } from '../../../../interfaces/interface';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-introduction-dialog',
  templateUrl: './introduction-dialog.component.html',
  styleUrls: ['./introduction-dialog.component.scss']
})
export class IntroductionDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public userIntro: Blockvitae.UserIntroduction
  ) {}
}
