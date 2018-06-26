import { Component, OnInit } from '@angular/core';
import { CheckMetamaskService } from '../../../services/check-metamask.service';
import { MatDialog } from '@angular/material';
import { Blockvitae } from '../../../interfaces/interface';
import { ActivatedRoute } from '@angular/router';
import { MetamaskWarningDialogComponent } from '../dialog/metamask-warning-dialog/metamask-warning-dialog.component';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  public userDetail: Blockvitae.UserDetail;

  public userSocial: Blockvitae.UserSocial;

  public isEditModeOn: boolean;

  private urlUsername: string;

  constructor(
    public dialog: MatDialog,
    private checkMetamask: CheckMetamaskService,
    private activatedRoute: ActivatedRoute
  ) {
    this.checkMetamask.initializeDappBrowser();
    this.userDetail = <Blockvitae.UserDetail>{};
    this.userSocial = <Blockvitae.UserSocial>{};
    this.isEditModeOn = false;
    this.urlUsername = null;
  }

  ngOnInit() {
    // map username to address
    this.mapUsername();

    // subscribe to metamask plugin update from 
    // app component
    this.generateMetamaskWarning();
  }

  /**
   * Subscribes to observable input from 
   * AppComponent. Triggers Dialog for warning
   * if metamask is not installed and user tries to edit their 
   * account
   */
  private generateMetamaskWarning(): void {
    this.checkMetamask.metamaskWarningDialog$
    .subscribe(generateWarning => {
      if(generateWarning) {
        this.openMetmaskWarningDialog();
      }
    });
  }

  /**
   * Triggers the warning dialog
   */
  private openMetmaskWarningDialog(): void {
    let dialogRef = this.dialog.open(MetamaskWarningDialogComponent);
  }


  /**
   * Maps the url username to address
   * 
   * @note 
   * Not done at route guard level because
   * metamask injects web3 after DOM loads.
   * At route guard level, web3 for current provider
   * is unavailable
   */
  private mapUsername(): void {
    this.activatedRoute.paramMap
      .subscribe(params => {
        // @TODO: validate username
        this.urlUsername = params.get('username');

        // get address for username
        this.checkMetamask
          .getAddrForUsername(this.urlUsername)
          .subscribe(res => {
            this.checkMetamask.owner = res;

            // get UserDetail Object
            this.getUserDetail();

            // get UserSocial Object
            this.getUserSocial();
          });
      });
  }

  /**
   * Get the user detail object
   * Network returns a string array
   * therefore, needs to be casted into
   * UserDetail object
   */
  private getUserDetail(): void {
    this.checkMetamask.getUserDetail()
      .subscribe(detail => {
        this.userDetail.fullName = detail[0];
        this.userDetail.userName = detail[1];
        this.userDetail.imgUrl = detail[2] === '' ? "https://images.pexels.com/photos/555790/pexels-photo-555790.png?auto=compress&cs=tinysrgb&h=350" : detail[2];
        this.userDetail.email = detail[3];
      })
  }

  private getUserSocial(): void {
    this.checkMetamask.getUserSocial()
    .subscribe(social => {
      this.userSocial.twitterUrl = social[0].length > 0 ? social[0] : null;
      this.userSocial.fbUrl = social[1].length > 0 ? social[1] : null;
      this.userSocial.githubUrl = social[2].length > 0 ? social[2] : null;
      this.userSocial.dribbbleUrl = social[3].length > 0 ? social[3] : null;
      this.userSocial.linkedinUrl = social[4].length > 0 ? social[4] : null;
      this.userSocial.behanceUrl = social[5].length > 0 ? social[5] : null;
      this.userSocial.mediumUrl = social[6].length > 0 ? social[6] : null;

      // @TODO add personal website link
      console.log(this.userSocial);
    });
  }
}
