/**
 * This service checks if a dapp browser like
 * Mist or Metamask has been installed in the browser
 * or not. If not then user is shown the link to install
 * Metamask from browser store.
 * 
 * @Todo
 * https://github.com/ethereum/web3.js/issues/1491
 */
import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Blockvitae } from './../interfaces/interface';
import { from, Observable, Subject } from 'rxjs';

// declare window variable to 
// inquire about the dapp browser
// type any so because window.web3 is
// not predefined. It is defined by
// dapp browser
declare let window: any;

// token abi
let tokenAbi = require('./../token/Blockvitae.json');

@Injectable({
  providedIn: "root"
})
export class CheckMetamaskService {

  // web3 instance
  // is instance of Web3 if Dapp
  // browser is installed and network is Ropsten
  // else is false
  public web3: Web3;

  // error
  public web3Error: Blockvitae.MetamaskError;

  // Holds list of all ethereum accounts provided
  // Metamask
  public accounts: Array<string>;

  // reference to the token on Blockchain
  public tokenContract: any;

  // if selected network is ropsten or not
  public isRopstenSet: boolean;

  // owner of the current blockvitae account
  // only owner is allowed to edit their account
  public owner: string;

  // if false user can view profile
  // but can't edit it or create an account
  // on the application
  public isMetamaskInstalled: boolean;

  // Observable that lets parent component: AppComponent
  // to display a dialog inside resume component
  // when user clicks on edit profile button
  // but the metamask is not installed
  public metamaskWarningDialog$: any;

  // true if the current user is the
  // owner of the profile else false
  // used to show edit button
  private metamaskInstalledSource = new Subject<boolean>();


  constructor() {
    this.web3 = null;
    this.web3Error = null;
    this.accounts = null;
    this.isRopstenSet = false;
    this.metamaskWarningDialog$ = this.metamaskInstalledSource.asObservable();
    this.owner = null;
    this.isMetamaskInstalled = false;
  }

  /**
    * Generates a warning dialog inside resume component through observable
    * if the client doesn't has metamask extension installed
    * and tries to edit their profile
    */
  public generateMetamaskWarning(generateWarning: boolean): void {
    this.metamaskInstalledSource.next(generateWarning)
  }

  /**
   * Get the user detail object from network
   * 
   * @returns Observable<string[]>
   */
  public getUserDetail(): Observable<string[]> {
    return from(
      this.tokenContract.methods.getUserDetail(this.owner).call()
    );
  }

  /**
   * Checks if any Dapp browser is installed or not
   *
   */
  public initializeDappBrowser(): void {
    if (this.isWeb3Defined()) {

      // create Web3 instance
      this.web3 = new Web3(window.web3.currentProvider);

      // check network id
      // should be ropsten
      this.isRopsten();

      // Ropsten selected
      // get accounts and set default
      // account
      this.getAccounts();

      this.isMetamaskInstalled = true;
    }
    else {
      // if user doesn't have metamask installed
      // they should still be able to view the profile
      // however, they won't be able to edit or create their
      // own untill they install metamask
      let provider = new Web3.providers
        .HttpProvider("https://ropsten.infura.io");
      this.web3 = new Web3(provider);

      this.isMetamaskInstalled = false;
    }

    // get token contract from blockchain
    // and its abi interface
    this.tokenContract = new this.web3.eth.Contract(
      tokenAbi.abi,
      '0x12c9f503fe05bb1a10e7f52fd073a7ca810ce5d2'
    );

  }

  /**
  * Checks if the username is available or already taken
  * 
  * @param string userName 
  * username to be checked
  * 
  * @returns Observable<boolean>
  */
  public checkUserNameAvailability(userName: string): Observable<boolean> {
    return from(
      this.tokenContract.methods
        .isUsernameAvailable(userName)
        .call()
    );
  }

  /**
   * Signs up the new user on the blockchain
   * 
   * @param Blockvitae.UserDetail user 
   * user detail variable having values for 
   * fullname, username and email. Image url 
   * will be updated once user starts creating their
   * profile
   * 
   * @returns Observable<any>
   */
  public signupUser(user: Blockvitae.UserDetail): Observable<any> {
    return from(
      this.tokenContract.methods
        .createUserDetail(
          user.fullName,
          user.userName,
          '',
          user.email
        ).send({
          from: this.web3.eth.defaultAccount
        })
    );
  }

  /**
   * Finds the address for the username
   * 
   * @param string username
   * Username to be searched
   * 
   * @returns Observable<string>
   */
  public getAddrForUsername(username: string): Observable<string> {
    return from(
      this.tokenContract.methods.getAddrForUserName(username).call()
    );
  }

  /**
   * Checks if dapp browser is present
   * and Web3 has been injected or not
   * 
   * @return boolean
   * true if Web3 has been injected else false
   */
  private isWeb3Defined(): boolean {
    if (typeof window === "undefined" || typeof window.web3 === "undefined") {

      // set web3 instance to null
      this.web3 = null;

      // return error
      this.web3Error = this.setMetamaskError(
        "DAPP_01",
        "DaPP_Browser_Not_Found",
        "Please install Metamask"
      );

      return false;
    }

    return true;
  }

  /**
   * Retrieves the accounts from dapp browser
   * and also sets the default account
   */
  private getAccounts(): void {
    this.web3.eth.getAccounts()
      .then(accounts => {
        accounts.length > 0 ? this.accounts = accounts : null;
        if (this.accounts !== null)
          this.web3.eth.defaultAccount = this.accounts[0];
      });
  }

  /**
   * Checks network id of ethereum network
   * set in the dapp browser
   * 
   * @returns void
   */
  private isRopsten(): void {
    if (this.web3 instanceof Web3) {
      // get network Id
      // 3 for ropsten
      this.getId()
        .then(id => {
          // network 3 for Ropsten
          if (id !== 3) {
            // ropsten not selected
            this.web3Error = this.setMetamaskError(
              "DAPP_02",
              "Ropsten_Network_Not_Found",
              "Please select Ropsten Network"
            );

            this.isRopstenSet = false;
          }
          else {
            this.isRopstenSet = true;
          }
        });
    }
    else {
      this.isRopstenSet = false;
    }
  }

  /**
   * Gets the Promise for the network id selected
   * 1: Mainnet
   * 3: Ropsten
   * 4: Rinkebey
   */
  private async getId(): Promise<any> {
    return await this.web3.eth.net.getId();
  }

  /**
   * Set the error values for error object
   * 
   * @param string _errorCode
   * error code for the error
   * 
   * @param string _errorMsg
   * error message for the error
   * 
   * @param string _errorDescription
   * Description of the error
   * 
   * @returns Blockvitae.MetamaskError
   * Error object with all the given values
   */
  private setMetamaskError(
    _errorCode: string,
    _errorMsg: string,
    _errorDescription: string): Blockvitae.MetamaskError {
    let error = <Blockvitae.MetamaskError>{};

    error.errorCode = _errorCode,
      error.errorMsg = _errorMsg,
      error.errorDescription = _errorDescription

    return error;
  }
}
