import { Component, DoCheck } from '@angular/core';
import { CheckMetamaskService } from './services/check-metamask.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck{

  // true if the current user is the owner of the
  // profile else false
  public isOwner: boolean;

  constructor(
    private checkMetamask: CheckMetamaskService
  ){}

  ngDoCheck() {
    this.isOwner = this.checkMetamask.isOwner;
  }
}
