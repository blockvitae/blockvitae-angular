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
let getterTokenAbi = require('./../token/BlockvitaeGetter.json');
let deleteTokenAbi = require('./../token/BlockvitaeDelete.json');
let insertTokenAbi = require('./../token/BlockvitaeInsert.json');

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

  // reference to the getter token
  public getterTokenContract: any;

  // reference to the setter token
  public setterTokenContract: any;

  // reference to the delete token
  public deleteTokenContract: any;

  // if selected network is ropsten or not
  public isRopstenSet: boolean;

  // owner of the current blockvitae account
  // only owner is allowed to edit their account
  //
  // @usage
  // ResumeComponent => mapUsername()
  public owner: string;

  // if false user can view profile
  // but can't edit it or create an account
  // on the application
  public isMetamaskInstalled: boolean;

  // Observable for work exp
  public workExp$: any;

  // Observable for education
  public education$: any;

  // Observable for project
  public project$: any;

  // Observable for publication
  public publication$: any;

  // Observabe for public mode of profile
  public profilePublicView$: Observable<boolean>;

  // Source for work exp observable
  private workExpSource = new Subject<{}>();

  // Source for education observable
  private educationSource = new Subject<{}>();

  // Source for project observable
  private projectSource = new Subject<{}>();

  // Source for publication observable
  private publicationSource = new Subject<{}>();

  // Source for view public mode of profile
  // observable listened in app component
  private profilePublicViewSource = new Subject<boolean>();

  constructor() {
    this.web3 = null;
    this.web3Error = null;
    this.accounts = null;
    this.isRopstenSet = false;
    this.owner = null;
    this.isMetamaskInstalled = false;
    this.workExp$ = this.workExpSource.asObservable();
    this.education$ = this.educationSource.asObservable();
    this.project$ = this.projectSource.asObservable();
    this.publication$ = this.publicationSource.asObservable();
    this.profilePublicView$ = this.profilePublicViewSource.asObservable();
  }

  public togglePublicViewMode(viewPublic: boolean): void {
    this.profilePublicViewSource.next(viewPublic);
  }

  /**
   * Get the user detail object from network
   * 
   * @return Observable<string[]>
   */
  public getUserDetail(): Observable<string[]> {
    return from(
      this.getterTokenContract.methods.getUserDetail(this.owner).call()
    );
  }

  /**
   * Gets the introduction object of the user from the network
   * 
   * @return Observable<string>
   */
  public getUserIntroduction(): Observable<string> {
    return from(
      this.getterTokenContract.methods.getUserIntroduction(this.owner).call()
    )
  }

  /**
   * Get the user social accounts from network
   * 
   * @return Observable<string[]>
   */
  public getUserSocial(): Observable<string[]> {
    return from(
      this.getterTokenContract.methods.getUserSocial(this.owner).call()
    );
  }

  /**
   * Get the array of user skills from network
   * 
   * @return Observable<string[]>
   */
  public getUserSkills(): Observable<string[]> {
    return from(
      this.getterTokenContract.methods.getUserSkills(this.owner).call()
    );
  }

  /**
   * Gets the count of work experiences user has
   * and then initiates the observables for each work
   * experience user has
   */
  public getWorkExp(): void {
    this.getWorkExpCount()
      .subscribe(count => {
        for (let i = 0; i < count; i++) {
          from(
            this.getterTokenContract.methods.getUserWorkExp(this.owner, i).call()
          )
            .subscribe(res => {
              this.workExpSource.next(
                // TODO Handle Errors
                { response: res, index: i }
              );
            })
        }
      });
  }

  /**
 * Delete work exp
 * 
 * @param number index
 * index of the work exp to be deleted
 */
  public deleteWorkExp(index: number): Observable<any> {
    return from(
      this.deleteTokenContract
        .methods
        .deleteUserWorkExp(index)
        .send({
          from: this.web3.eth.defaultAccount
        })
    )
  }

  /**
  * Gets the count of education user has
  * and then initiates the observables for each education
  * user has
  */
  public getEducation(): void {
    this.getEducationCount()
      .subscribe(count => {
        for (let i = 0; i < count; i++) {
          from(
            this.getterTokenContract.methods.getUserEducation(this.owner, i).call()
          )
            .subscribe(res => {
              this.educationSource.next(
                // TODO Handle Errors
                { response: res, index: i }
              );
            })
        }
      });
  }

  /**
   * Delete education
   * 
   * @param number index
   * index of the education to be deleted
   */
  public deleteEducation(index: number): Observable<any> {
    return from(
      this.deleteTokenContract
        .methods
        .deleteUserEducation(index)
        .send({
          from: this.web3.eth.defaultAccount
        })
    )
  }

  /**
  * Gets the count of projects user has
  * and then initiates the observables for each project
  * user has
  */
  public getProjects(): void {
    this.getProjectCount()
      .subscribe(count => {
        for (let i = 0; i < count; i++) {
          from(
            this.getterTokenContract.methods.getUserProject(this.owner, i).call()
          )
            .subscribe(res => {
              this.projectSource.next(
                // TODO: Handle errors
                { response: res, index: i }
              );
            })
        }
      });
  }

  /**
  * Gets the count of publications user has
  * and then initiates the observables for each publication
  * user has
  */
 public getPublications(): void {
  this.getPublicationCount()
    .subscribe(count => {
      for (let i = 0; i < count; i++) {
        from(
          this.getterTokenContract.methods.getUserPublication(this.owner, i).call()
        )
          .subscribe(res => {
            this.publicationSource.next(
              // TODO: Handle errors
              { response: res, index: i }
            );
          })
      }
    });
}

  /**
   * Delete project
   * 
   * @param number index
   * index of the project to be deleted
   */
  public deleteProject(index: number): Observable<any> {
    return from(
      this.deleteTokenContract
        .methods
        .deleteUserProject(index)
        .send({
          from: this.web3.eth.defaultAccount
        })
    )
  }

  /**
   * Sets the introduction of the user on the network
   * 
   * @param string intro 
   * Introduction of the user
   * 
   * @return Observable<any>
   */
  public setIntroduction(intro: string): Observable<any> {
    return from(
      this.setterTokenContract
        .methods
        .createUserIntroduction(intro)
        .send({
          from: this.web3.eth.defaultAccount
        })
    );
  }

  /**
   * Sets the user details of the user on the network
   * 
   * @param Blockvitae.UserDetail userDetail
   * user detail object of the user
   * 
   * @return Observable<any>
   */
  public setUserDetail(userDetail: Blockvitae.UserDetail): Observable<any> {
    return from(
      this.setterTokenContract
        .methods
        .updateUserDetail(
          userDetail.fullName,
          userDetail.userName,
          userDetail.imgUrl,
          userDetail.email,
          userDetail.location,
          userDetail.shortDescription
        )
        .send({
          from: this.web3.eth.defaultAccount
        })
    );
  }

  /**
   * Sets the user social details of the user on the network
   * 
   * @param Blockvitae.UserSocial userSocial
   * user social object of the user
   * 
   * @return Observable<any>
   */
  public setUserSocial(userSocial: Blockvitae.UserSocial): Observable<any> {
    return from(
      this.setterTokenContract
        .methods
        .createUserSocial(
          userSocial.websiteUrl,
          userSocial.twitterUrl,
          userSocial.fbUrl,
          userSocial.githubUrl,
          userSocial.dribbbleUrl,
          userSocial.linkedinUrl,
          '',
          userSocial.mediumUrl
        )
        .send({
          from: this.web3.eth.defaultAccount
        })
    );
  }

  /**
   * Sets the user skills on the network
   * 
   * @param string[] userSkills 
   * array of skills
   * 
   * @return Observable<any>
   */
  public setUserSkills(userSkills: string[]): Observable<any> {
    return from(
      this.setterTokenContract
        .methods
        .createUserSkill(userSkills)
        .send({
          from: this.web3.eth.defaultAccount
        })
    );
  }

  /**
   * Sets the user work experience
   * 
   * @param userWork Blockvitae.UserWorkExp
   * UserWorkExp object
   * 
   * @return Observable<any> 
   */
  public setUserWorkExp(userWork: Blockvitae.UserWorkExp): Observable<any> {
    return from(
      this.setterTokenContract
        .methods
        .createUserWorkExp(
          userWork.company,
          userWork.position,
          userWork.dateStart,
          userWork.dateEnd,
          userWork.description,
          userWork.isWorking,
          userWork.isDeleted
        )
        .send({
          from: this.web3.eth.defaultAccount
        })
    );
  }

  /**
   * Sets the user project
   * 
   * @param userProject Blockvitae.UserProject
   * UserProject object
   * 
   * @return Observable<any>
   */
  public setUserProject(userProject: Blockvitae.UserProject): Observable<any> {
    return from(
      this.setterTokenContract
        .methods
        .createUserProject(
          userProject.name,
          userProject.shortDescription,
          userProject.description,
          userProject.url,
          userProject.isDeleted
        )
        .send({
          from: this.web3.eth.defaultAccount
        })
    )
  }

  /**
   * Sets the user publication
   * 
   * @param userProject Blockvitae.UserPublication
   * UserPublication object
   * 
   * @return Observable<any>
   */
  public setUserPublication(userPublication: Blockvitae.UserPublication): Observable<any> {
    return from(
      this.setterTokenContract
        .methods
        .createUserPublication(
          userPublication.title,
          userPublication.url,
          userPublication.description,
          userPublication.isDeleted
        )
        .send({
          from: this.web3.eth.defaultAccount
        })
    )
  }

  /**
   * Sets the user education
   * 
   * @param userEdu Blockvitae.UserEducation
   * UserEducation object 
   * 
   * @return Observable<any>
   */
  public setUserEducation(userEdu: Blockvitae.UserEducation): Observable<any> {
    return from(
      this.setterTokenContract
        .methods
        .createUserEducation(
          userEdu.organization,
          userEdu.degree,
          userEdu.dateStart,
          userEdu.dateEnd,
          userEdu.description,
          userEdu.isDeleted
        )
        .send({
          from: this.web3.eth.defaultAccount
        })
    )
  }

  /**
   * Checks if any Dapp browser is installed or not
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
      '0x883efb9dbbbffc3259cb628460d5fb8a8772cc64'
    );

    this.getterTokenContract = new this.web3.eth.Contract(
      getterTokenAbi.abi,
      '0x294ec3ea29b14e2098917ab4b5cb25f0a5a7a91c' 
    );

    this.setterTokenContract = new this.web3.eth.Contract(
      insertTokenAbi.abi,
      '0x0fb5e555b3708080f5eba5a92da5f867f082da46'
    );

    this.deleteTokenContract = new this.web3.eth.Contract(
      deleteTokenAbi.abi,
      '0x584ede2debd4f546eebd90fd964289306ed71e57'
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
    userName = this.web3.utils.fromAscii(userName);
    return from(
      this.getterTokenContract.methods
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
      this.setterTokenContract.methods
        .createUserDetail(
          user.fullName,
          this.web3.utils.fromAscii(user.userName),
          '',
          user.email,
          '',
          ''
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
    username = this.web3.utils.fromAscii(username);
    return from(
      this.getterTokenContract.methods.getAddrForUserName(username).call()
    );
  }

  /**
   * Get the count of total education from the network
   * 
   * @returns Observable<number>
   */
  private getEducationCount(): Observable<number> {
    return from(
      this.getterTokenContract.methods.getEducationCount(this.owner).call()
    );
  }


  /**
   * Get the count of total projects from the network
   * 
   * @returns Observable<number>
   */
  private getProjectCount(): Observable<number> {
    return from(
      this.getterTokenContract.methods.getProjectCount(this.owner).call()
    );
  }

  /**
   * Get the count of total publications from the network
   * 
   * @returns Observable<number>
   */
  private getPublicationCount(): Observable<number> {
    return from(
      this.getterTokenContract.methods.getPublicationCount(this.owner).call()
    );
  }

  /**
   * Get the count of total work experiences from the network
   * 
   * @returns Observable<number>
   */
  private getWorkExpCount(): Observable<number> {
    return from(
      this.getterTokenContract.methods.getWorkExpCount(this.owner).call()
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
   * 
   * @TODO: Update to Observables
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
