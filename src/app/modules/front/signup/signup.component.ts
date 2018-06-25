import { CheckMetamaskService } from './../../../services/check-metamask.service';
import { Component, DoCheck } from '@angular/core';
import { Blockvitae } from '../../../interfaces/interface';

const BTN_TEXT = "Create My Portfolio";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements DoCheck{

  // user object containing
  // fullname, email and username
  public user: Blockvitae.UserDetail;

  // true if Ropsten Network is selected
  // else false
  public ropstenSelected: boolean;

  // address of the selected account
  public address: string;

  // error message
  public errorMsg: string;

  // true if provided username is 
  // available else false
  public isUsernameAvailable: boolean;

  // true while waiting for ethereum 
  // network to respond
  public registrationInProcess: boolean;

  // btnText = "Create My Portfolio" initially
  // btnText = "Please Wait..." while
  // waiting for response
  public btnText: string;

  /**
   * constructor
   */
  constructor(
    private checkMetamask: CheckMetamaskService,
  ) {
    // initialize dummy object
    this.user = <Blockvitae.UserDetail>{};
    this.address = "";
    this.ropstenSelected = true;
    this.isUsernameAvailable = false;
    this.registrationInProcess = false;
    this.errorMsg = "";
    this.btnText = BTN_TEXT;

    // initialize web3
    this.checkMetamask.initializeDappBrowser();
  }

  /**
   * Never miss this component during Angular
   * Change detect cycle
   * 
   * @Ref: https://stackoverflow.com/questions/42643389/why-do-we-need-ngdocheck
   */
  ngDoCheck() {
    if (this.checkMetamask.metamaskInstalled) {
      this.address = this.checkMetamask.web3.eth.defaultAccount;
      this.ropstenSelected = this.checkMetamask.isRopstenSet;
    }
  }

  /**
   * Validates if the given userName has
   * already been taken or not
   */
  public checkUserNameAvailability() {
      this.checkMetamask.checkUserNameAvailability(this.user.userName)
                 .subscribe(res =>  {
                    this.isUsernameAvailable = res;
                    if (!this.isUsernameAvailable)
                      this.errorMsg = "Username is already taken!";
                 });
  }

  /**
   * Registers user to the smart contract
   * If successfull redirects user to the dashboard page
   * to build the profile else shows the error
   */
  public registerUser() {
    this.registrationInProcess = true;
    this.btnText = "Please Wait...";
    this.checkMetamask.signupUser(this.user)
               .subscribe(res => {
                 if (res.status) {
                   // success
                  console.log("Registered");
                 }
                 else {
                   // @TODO error
                 }
                 this.registrationInProcess = false;
                 this.btnText = BTN_TEXT;
                });          
  }
}
