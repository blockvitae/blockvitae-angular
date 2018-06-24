import { Blockvitae } from './../interfaces/interface';
import { CheckMetamaskService } from './check-metamask.service';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable()
export class SignupService {

  constructor(
    private checkMetamask: CheckMetamaskService
  ) { 
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
      this.checkMetamask.tokenContract.methods
          .isUsernameAvailable(userName)
          .call()
    );
  }

  // public signupUser(user: Blockvitae.User): boolean {

  // }
}
