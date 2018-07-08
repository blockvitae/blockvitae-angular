import { Component } from '@angular/core';
import { CheckMetamaskService } from './services/check-metamask.service';
import { LocationStrategy } from '../../node_modules/@angular/common';

const BTN_TEXT_VIEW_PUBLIC = "View Public Profile";
const BTN_TEXT_HIDE_PUBLIC = "Edit Profile";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public btnText: string;

  public viewPublic: boolean;

  public showBtn: boolean;

  constructor(
    private checkMetamask: CheckMetamaskService,
    private url: LocationStrategy
  ) {
    this.checkMetamask.initializeDappBrowser();
    this.btnText = BTN_TEXT_VIEW_PUBLIC;
    this.viewPublic = false;

    // show button only if on profile page
    if (this.url.path().indexOf('/resume') < 0)
      this.showBtn = false;
    else
      this.showBtn = true;
  }

  /**
   * Shows the public view of the profile
   */
  public editPublicView() {
    this.checkMetamask.togglePublicViewMode(!this.viewPublic);
    this.viewPublic = !this.viewPublic;
    if (this.viewPublic)
      this.btnText = BTN_TEXT_HIDE_PUBLIC;
    else
      this.btnText = BTN_TEXT_VIEW_PUBLIC;
  }
}
