import { Component } from '@angular/core';
import { CheckMetamaskService } from './services/check-metamask.service';

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

  constructor(
    private checkMetamask: CheckMetamaskService
  ) {
    this.checkMetamask.initializeDappBrowser();
    this.btnText = BTN_TEXT_VIEW_PUBLIC;
    this.viewPublic = false;
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
