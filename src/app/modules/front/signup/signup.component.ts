import { CheckMetamaskService } from './../../../services/check-metamask.service';
import { Component, DoCheck } from '@angular/core';
import { Blockvitae } from '../../../interfaces/interface';
import { Router } from '../../../../../node_modules/@angular/router';

const BTN_TEXT = "Create My Portfolio";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements DoCheck {

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

  // web3 installed
  public web3Installed: boolean;

  // Regex for username
  // @Ref: https://stackoverflow.com/a/12019115/7868843
  private regexp: RegExp;

  // true if username has correct Regex
  public isCorrectUsername: boolean;

  /**
   * constructor
   */
  constructor(
    private checkMetamask: CheckMetamaskService,
    private router: Router
  ) {
    // initialize dummy object
    this.user = <Blockvitae.UserDetail>{};
    this.address = "";
    this.ropstenSelected = true;
    this.isUsernameAvailable = false;
    this.isCorrectUsername = false;
    this.registrationInProcess = false;
    this.errorMsg = "";
    this.btnText = BTN_TEXT;
    this.regexp = new RegExp('^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$');

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
    if (this.checkMetamask.isMetamaskInstalled) {
      this.address = this.checkMetamask.web3.eth.defaultAccount;
      this.ropstenSelected = this.checkMetamask.isRopstenSet;
      this.web3Installed = this.checkMetamask.isMetamaskInstalled;
    }
  }

  /**
   * Validates if the given userName has
   * already been taken or not
   */
  public checkUserNameAvailability() {
    this.isCorrectUsername = this.regexp.test(this.user.userName);
    if (this.isCorrectUsername) {
      this.checkMetamask.checkUserNameAvailability(this.user.userName)
        .subscribe(res => {
          this.isUsernameAvailable = res;
          if (!this.isUsernameAvailable)
            this.errorMsg = "Username is already taken!";
        });
    }
    else {
      this.errorMsg = "Invalid Username! Max-length allowed: 20, no @, _ or . at the beginning, no __ or _. or ._ or .. inside, no _ or . at the end";
    }
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
          let route = "/resume/" + this.user.userName;
          window.location.href = 'https://blockvitae.herokuapp.com' + route;
        }
        else {
          // @TODO error
        }
        this.registrationInProcess = false;
        this.btnText = BTN_TEXT;
      });
  }
}
