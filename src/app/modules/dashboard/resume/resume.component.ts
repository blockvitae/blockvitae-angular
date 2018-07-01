import { Component, OnInit } from '@angular/core';
import { CheckMetamaskService } from '../../../services/check-metamask.service';
import { MatDialog } from '@angular/material';
import { Blockvitae } from '../../../interfaces/interface';
import { ActivatedRoute } from '@angular/router';
import { MetamaskWarningDialogComponent } from '../dialog/metamask-warning-dialog/metamask-warning-dialog.component';
import { ProfileDialogComponent } from '../dialog/profile-dialog/profile-dialog.component';
import { IntroductionDialogComponent } from '../dialog/introduction-dialog/introduction-dialog.component';
import { SkillsDialogComponent } from '../dialog/skills-dialog/skills-dialog.component';
import { WorkexpDialogComponent } from '../dialog/workexp-dialog/workexp-dialog.component';
import { ProjectsDialogComponent } from '../dialog/projects-dialog/projects-dialog.component';
import { EducationDialogComponent } from '../dialog/education-dialog/education-dialog.component';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  // user detail object
  public userDetail: Blockvitae.UserDetail;

  // user social object
  public userSocial: Blockvitae.UserSocial;

  // user skills array
  public userSkills: string[];

  // array of user work experience objects
  public userWorkExp: Blockvitae.UserWorkExp[];

  // array of user education objects
  public userEducation: Blockvitae.UserEducation[];

  // array of user project objects
  public userProjects: Blockvitae.UserProject[];

  // true if user has clicked on edit profile
  // for making changes
  public isEditModeOn: boolean;

  public userIntro: Blockvitae.UserIntroduction;

  // username from the url
  // basically the username of the profile
  private urlUsername: string;

  constructor(
    public dialog: MatDialog,
    private checkMetamask: CheckMetamaskService,
    private activatedRoute: ActivatedRoute
  ) {
    this.checkMetamask.initializeDappBrowser();
    this.userDetail = <Blockvitae.UserDetail>{};
    this.userSocial = <Blockvitae.UserSocial>{};
    this.userIntro = <Blockvitae.UserIntroduction>{};
    this.userWorkExp = [];
    this.userEducation = [];
    this.userProjects = [];
    this.isEditModeOn = false;
    this.urlUsername = null;
    this.userSkills = [];
  }

  ngOnInit() {
    // map username to address
    this.mapUsername();

    // subscribe to metamask plugin update from 
    // app component
    this.generateMetamaskWarning();
  }

  public editProfile(): void {
    this.dialog.open(ProfileDialogComponent);
  }

  public editIntroduction(): void {
   let dialogRef = this.dialog.open(IntroductionDialogComponent, {
     data: this.userIntro
   });

   dialogRef.afterClosed().subscribe(result => {
    if (!result) {
      // false
    }
    else {
      this.userIntro = result;
    }

   });
  }

  public editSkills(): void {
    this.dialog.open(SkillsDialogComponent);
  }

  public addWorkExp(): void {
    this.dialog.open(WorkexpDialogComponent);
  }

  public addProject(): void {
    this.dialog.open(ProjectsDialogComponent);
  }

  public addEducation(): void {
    this.dialog.open(EducationDialogComponent);
  }

  /**
   * Subscribes to observable input from 
   * AppComponent. Triggers Dialog for warning
   * if metamask is not installed and user tries to edit their 
   * account
   */
  private generateMetamaskWarning(): void {
    this.checkMetamask.metamaskWarningDialog$
      .subscribe(generateWarning => {
        if (generateWarning) {
          this.openMetmaskWarningDialog();
        }
      });
  }

  /**
   * Triggers the warning dialog
   */
  private openMetmaskWarningDialog(): void {
    this.dialog.open(MetamaskWarningDialogComponent);
  }

  /**
   * Maps the url username to address
   * 
   * @note 
   * Not done at route guard level because
   * metamask injects web3 after DOM loads.
   * At route guard level, web3 for current provider
   * is unavailable
   */
  private mapUsername(): void {
    this.activatedRoute.paramMap
      .subscribe(params => {
        // @TODO: validate username
        this.urlUsername = params.get('username');

        // get address for username
        this.checkMetamask
          .getAddrForUsername(this.urlUsername)
          .subscribe(res => {
            this.checkMetamask.owner = res;

            // get UserDetail Object
            this.getUserDetail();

            // get UserSocial Object
            this.getUserSocial();

            // get user skills
            this.getUserSkills();

            // get work exp
            this.getUserWorkExp();

            // get user education
            this.getUserEducation();

            // get user projects
            this.getUserProjects();
          });
      });
  }

  /**
   * Get the user detail object
   * Network returns a string array
   * therefore, needs to be casted into
   * UserDetail object
   */
  private getUserDetail(): void {
    this.checkMetamask.getUserDetail()
      .subscribe(detail => {
        this.userDetail.fullName = detail[0];
        this.userDetail.userName = detail[1];
        this.userDetail.imgUrl = detail[2] === '' ? "https://images.pexels.com/photos/555790/pexels-photo-555790.png?auto=compress&cs=tinysrgb&h=350" : detail[2];
        this.userDetail.email = detail[3];
      })
  }

  /**
   * Fetches all the social accounts of the user.
   * Sets null for each social account which is not present
   */
  private getUserSocial(): void {
    this.checkMetamask.getUserSocial()
      .subscribe(social => {
        this.userSocial.twitterUrl = social[0].length > 0 ? social[0] : null;
        this.userSocial.fbUrl = social[1].length > 0 ? social[1] : null;
        this.userSocial.githubUrl = social[2].length > 0 ? social[2] : null;
        this.userSocial.dribbbleUrl = social[3].length > 0 ? social[3] : null;
        this.userSocial.linkedinUrl = social[4].length > 0 ? social[4] : null;
        this.userSocial.behanceUrl = social[5].length > 0 ? social[5] : null;
        this.userSocial.mediumUrl = social[6].length > 0 ? social[6] : null;

        // @TODO add personal website link
      });
  }

  /**
   * Initiates the getWorkExp method and
   * then subscribes to the observables for
   * each workexp set by getWorkExp method
   */
  private getUserWorkExp(): void {
    // start fetching observables
    this.checkMetamask.getWorkExp();

    // observe observables
    this.checkMetamask.workExp$
      .subscribe(workExp => {
        let userWorkExp = {
          company: workExp[0],
          position: workExp[1],
          dateStart: workExp[2],
          dateEnd: workExp[3],
          description: workExp[4]
        };

        // push in the array
        this.userWorkExp.push(userWorkExp);
      });
  }

  /**
   * Initiates the getEducation method and
   * then subscribes to the observables for
   * each education set by getEducation method
   */
  private getUserEducation(): void {
    // start fecthing observables
    this.checkMetamask.getEducation();

    // observe observables
    this.checkMetamask.workExp$
      .subscribe(education => {
        let userEducation = {
          organization: education[0],
          degree: education[1],
          dateStart: education[2],
          dateEnd: education[3],
          description: education[4]
        };

        // push in the array
        this.userEducation.push(userEducation);
      });
  }

  /**
   * Initiates the getUserProjects method and
   * then subscribes to the observables for
   * each project set by getProjects method
   */
  private getUserProjects(): void {
    // start fecthing observables
    this.checkMetamask.getProjects();

    // observe observables
    this.checkMetamask.project$
      .subscribe(project => {
        let userProject = {
          name: project[0],
          shortDescription: project[1],
          description: project[2],
          url: project[3]
        };

        // push in the array
        this.userProjects.push(userProject);
      });
  }

  /**
   * Fetches array of user skills
   */
  private getUserSkills(): void {
    this.checkMetamask.getUserSkills()
      .subscribe(skills => {
        for (let i = 0; i < skills.length; i++) {
          // add to the array
          this.userSkills.push(skills[i]);
        }
      });
  }
}
