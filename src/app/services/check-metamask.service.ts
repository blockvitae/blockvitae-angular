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

  // true if the current user is the
  // owner of the profile else false
  // used to show edit button
  public isOwner: boolean;

  constructor() {
    this.web3 = null;
    this.web3Error = null;
    this.accounts = null;
    this.isRopstenSet = false;
    this.isOwner = false;
  }

  /**
   * Checks if any Dapp browser is installed or not
   * 
   * @returns boolean
   * returns true if web3 is ready to use else false
   */
  public initializeDappBrowser(): boolean {
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

      // get token contract from blockchain
      // and its abi interface
      this.tokenContract = new this.web3.eth.Contract(
              tokenAbi.abi,
              '0x12c9f503fe05bb1a10e7f52fd073a7ca810ce5d2'  
      );

      return true;
    }

    return false;
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
      this.web3Error =  this.setMetamaskError(
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
