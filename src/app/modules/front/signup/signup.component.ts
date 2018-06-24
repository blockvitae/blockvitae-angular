import { CheckMetamaskService } from './../../../services/check-metamask.service';
import { Component, DoCheck } from '@angular/core';
import { SignupService } from '../../../services/signup.service';
import { Blockvitae } from '../../../interfaces/interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [SignupService]
})
export class SignupComponent implements DoCheck{

  public user: Blockvitae.UserDetail;

  public web3Installed: boolean;

  public ropstenSelected: boolean;

  public address: string;

  public errorMsg: string;

  public isUsernameAvailable: boolean;

  /**
   * constructor
   */
  constructor(
    private checkMetamask: CheckMetamaskService,
    private signup: SignupService
  ) {
    // initialize dummy object
    this.user = <Blockvitae.UserDetail>{};
    this.web3Installed = false;
    this.address = "";
    this.ropstenSelected = true;
    this.isUsernameAvailable = false;
    this.errorMsg = "";

    // initialize web3
    this.web3Installed = this.checkMetamask.initializeDappBrowser();
  }

  /**
   * Never miss this component during Angular
   * Change detect cycle
   * 
   * @Ref: https://stackoverflow.com/questions/42643389/why-do-we-need-ngdocheck
   */
  ngDoCheck() {
    if (this.web3Installed) {
      this.address = this.checkMetamask.web3.eth.defaultAccount;
      this.ropstenSelected = this.checkMetamask.isRopstenSet;
    }
  }

  /**
   * This function validates if the given userName has
   * already been taken or not
   */
  public checkUserNameAvailability() {
      this.signup.checkUserNameAvailability(this.user.userName)
                 .subscribe(res =>  {
                    this.isUsernameAvailable = res;
                    if (!this.isUsernameAvailable)
                      this.errorMsg = "Username is already taken!";
                 });
  }
}
