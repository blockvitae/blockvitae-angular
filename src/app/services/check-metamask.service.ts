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

import { BlockvitaeError } from './../interfaces/BlockvitaeError.interface';

// declare window variable to 
// inquire about the dapp browser
// type any so because window.web3 is
// not predefined. It is defined by
// dapp browser
declare let window: any;

// require is not included in typescript
// lib.d.ts file. Therefore declare it
// https://stackoverflow.com/a/12742371/7868843
// https://stackoverflow.com/a/46819440/7868843
// http://blogs.microsoft.co.il/gilf/2013/07/22/quick-tip-typescript-declare-keyword/
// declare function require(name: string);

@Injectable({
  providedIn: "root"
})
export class CheckMetamaskService {

  // web3 instance
  // is instance of Web3 if Dapp
  // browser is installed and network is Ropsten
  // else is false
  public web3: Web3 | null;

  constructor() {
    this.web3 = null;
  }

  /**
   * Checks if any Dapp browser is installed or not
   * 
   * @returns boolean | BlockvitaeError.MetamaskError
   * returns true if installed and sets the global
   * web3 else returns BlockvitaeError.MetamaskError
   */
  public checkDappBrowser(): BlockvitaeError.MetamaskError | boolean {
    if (typeof window === "undefined" || typeof window.web3 === "undefined") {
        
        // set web3 instance to null
        this.web3 = null;

        // return error
        return this.setMetamaskError(
          "DAPP_01",
          "DaPP_Browser_Not_Found",
          "Please install Metamask"
        );
    }
    else {

      // create Web3 instance
      this.web3 = new Web3(window.web3.currentProvider);
      return true;
    }
  }

  /**
   * Returns the web3 instance
   * 
   * @returns Web3 instance
   */
  public getWeb3(): any {
    return this.web3;
  }

  /**
   * Checks network id of ethereum network
   * set in the dapp browser
   * 1: Mainnet
   * 3: Ropsten
   * 4: Rinkebey
   * 
   * @returns boolean
   * true if the network id is 3 else
   * false
   */
  public async checkNetworkId(): Promise<BlockvitaeError.MetamaskError>{
    if (this.web3 instanceof Web3) {
      // get network Id
      // 3 for ropsten
      let networkId = await this.web3.eth.net.getId();
      if (networkId !== 3) {
        // ropsten not selected
        return this.setMetamaskError(
          "DAPP_02",
          "Ropsten_Network_Not_Found",
          "Please select Ropsten Network"
        );
      }
    }
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
   * @returns BlockvitaeError.MetamaskError
   * Error object with all the given values
   */
  private setMetamaskError(_errorCode: string, 
    _errorMsg: string, 
    _errorDescription: string): BlockvitaeError.MetamaskError {
      let error: BlockvitaeError.MetamaskError;
      error = {
        errorCode: _errorCode,
        errorMsg: _errorMsg,
        errorDescription: _errorDescription
      };

      return error;
    }
}
