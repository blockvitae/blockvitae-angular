import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Blockvitae } from '../../../../interfaces/interface';

@Component({
  selector: 'app-user-social-dialog',
  templateUrl: './user-social-dialog.component.html',
  styleUrls: ['./user-social-dialog.component.scss']
})
export class UserSocialDialogComponent{

  constructor(
    @Inject(MAT_DIALOG_DATA) public userSocial: Blockvitae.UserSocial
  ) { }
}
