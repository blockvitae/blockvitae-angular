import { Blockvitae } from './../interfaces/interface';
import { CheckMetamaskService } from './check-metamask.service';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable()
export class SignupService {

  constructor(
    private checkMetamask: CheckMetamaskService
  ) {}

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
      this.checkMetamask.tokenContract.methods
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
      this.checkMetamask.tokenContract.methods
          .createUserDetail(
            user.fullName,
            user.userName,
            '',
            user.email
          ).send({
            from: this.checkMetamask.web3.eth.defaultAccount
          })
    );
  }
}
