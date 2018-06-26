import { Component } from '@angular/core';
import { CheckMetamaskService } from './services/check-metamask.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public editProfileMsg: string;

  constructor(
    private checkMetamask: CheckMetamaskService
  ) {
    this.checkMetamask.initializeDappBrowser();
    this.editProfileMsg = "Edit Profile";
  }

  /**
   * Generates a warning dialog inside resume component through observable
   * if the client doesn't has metamask extension installed
   * and tries to edit their profile
   */
  public editProfileToggle() {
    if (!this.checkMetamask.isMetamaskInstalled) {
      this.checkMetamask.generateMetamaskWarning(true);
    }
  }
}
