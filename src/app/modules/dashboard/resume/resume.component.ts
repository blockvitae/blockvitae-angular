import { Component, OnInit } from '@angular/core';
import { CheckMetamaskService } from '../../../services/check-metamask.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Blockvitae } from '../../../interfaces/interface';
import { ActivatedRoute } from '@angular/router';
import { MetamaskWarningDialogComponent } from '../dialog/metamask-warning-dialog/metamask-warning-dialog.component';
import { ProfileDialogComponent } from '../dialog/profile-dialog/profile-dialog.component';
import { IntroductionDialogComponent } from '../dialog/introduction-dialog/introduction-dialog.component';
import { SkillsDialogComponent } from '../dialog/skills-dialog/skills-dialog.component';
import { WorkexpDialogComponent } from '../dialog/workexp-dialog/workexp-dialog.component';
import { ProjectsDialogComponent } from '../dialog/projects-dialog/projects-dialog.component';
import { EducationDialogComponent } from '../dialog/education-dialog/education-dialog.component';
import { TransactionProcessingDialogComponent } from '../dialog/transaction-processing-dialog/transaction-processing-dialog.component';
import { UserSocialDialogComponent } from '../dialog/user-social-dialog/user-social-dialog.component';

// import moment
import * as _moment from 'moment';

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

  // Object for user introduction
  public userIntro: Blockvitae.UserIntroduction;

  // username from the url
  // basically the username of the profile
  private urlUsername: string;

  // dialog reference for transaction 
  // processing dialog
  private dialogRef: any;

  constructor(
    public dialog: MatDialog,
    private checkMetamask: CheckMetamaskService,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar
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
    this.dialogRef = null;
  }

  ngOnInit() {
    // map username to address
    this.mapUsername();

    // subscribe to metamask plugin update from 
    // app component
    this.generateMetamaskWarning();
  }

  /**
   * Edits the user Detail section of the user
   */
  public editUserDetail(): void {
    let dialogRef = this.dialog.open(ProfileDialogComponent, {
      data: this.userDetail
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.userDetail = data;

        this.updateUserDetail();
      }
      else {
        this.getUserDetail();
      }
    });
  }

  /**
   * Edits the user Social section of the user
   */
  public editUserSocial(): void {
    let dialogRef = this.dialog.open(UserSocialDialogComponent, {
      data: this.userSocial
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.userSocial = data;

        this.updateUserSocial();
      }
      else {
        this.getUserSocial();
      }
    });
  }

  /**
   * Edits the introduction of the user
   */
  public editIntroduction(): void {
    // Open dialog to get new introduction
    let dialogRef = this.dialog.open(IntroductionDialogComponent, {
      data: this.userIntro
    });

    // @TODO validate introduction

    // After dialog is closed if clicked on update
    // call update introduction
    // else call getIntroduction
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userIntro = result;

        // update blockchain
        this.updateIntroduction();
      }
      else {
        // get the old introduction
        this.getIntroduction();
      }

    });
  }

  /**
   * Edit User Skills
   */
  public editSkills(): void {
    let dialogRef = this.dialog.open(SkillsDialogComponent, {
      data: this.userSkills
    });

    dialogRef.afterClosed().subscribe(skills => {
      if (skills.length > 0) {
        // convert from string to bytes
        let userSkillsBytes = [];
        for (let i = 0; i < skills.length; i++) {
          userSkillsBytes
            .push(this.checkMetamask.web3.utils.asciiToHex(skills[i]));
        }

        // update blockchain
        this.updateUserSkills(userSkillsBytes);
      }
      else {
        // get old skills
        this.getUserSkills();
      }
    });
  }

  /**
   * Add Work Experience
   */
  public addWorkExp(): void {
    let userWork = <Blockvitae.UserWorkExp>{};
    let dialogRef = this.dialog.open(WorkexpDialogComponent, {
      data: userWork
    });

    dialogRef.afterClosed().subscribe(userWork => {
      if (userWork) {
        userWork = userWork;

        // change date start format
        if (userWork.dateStart != null) {
          userWork.dateStart = _moment(userWork.dateStart).format("MMM-YY");
        }

        // change date end format
        if (userWork.dateEnd != null)
          userWork.dateEnd = _moment(userWork.dateEnd).format("MMM-YY");
        else
          userWork.dateEnd = "";

        // TODO: user cannot select end date and is working simultaneously

        // update blockchain
        this.updateWorkExp(userWork);
      }
      else {
        // get old work exp data
        this.getUserWorkExp();
      }
    });
  }

  /**
   * Adds a new project
   */
  public addProject(): void {
    let userProject = <Blockvitae.UserProject>{};
    let dialogRef = this.dialog.open(ProjectsDialogComponent, {
      data: userProject
    })

    dialogRef.afterClosed().subscribe(project => {
      if (project != null) {
        userProject = project;

        if (!userProject.url) {
          userProject.url = "";
        }

        // update blockchain
        this.updateProject(userProject);
      }
      else {
        // get old projects
        this.getUserProjects();
      }
    });
  }

  /**
   * Adds a new education
   */
  public addEducation(): void {
    let userEdu = <Blockvitae.UserEducation>{};
    let dialogRef = this.dialog.open(EducationDialogComponent, {
      data: userEdu
    });

    dialogRef.afterClosed().subscribe(education => {
      if (education != null) {
        userEdu = education;

        // change date start format
        if (userEdu.dateStart != null)
          userEdu.dateStart = _moment(userEdu.dateStart).format("MMM-YY");
        else
          userEdu.dateStart = "";

        // change date end format
        if (userEdu.dateEnd != null)
          userEdu.dateEnd = _moment(userEdu.dateEnd).format("MMM-YY");
        else
          userEdu.dateEnd = "";

        // update blockchain
        this.updateEducation(userEdu);
      }
      else {
        // get old education
        this.getUserEducation();
      }


    });
  }

  /**
   * Deletes an education record
   * 
   * @param number index
   * Index of the education to be deleted 
   */
  public deleteEducation(index: number): void {
    // open processing dialog
    this.openTxnProcessingDialog();

    this.checkMetamask
      .deleteEducation(index)
      .subscribe(res => {
        if (res.status) {
          this.getUserEducation();
        }

        // show snackbar
        this.showSuccessSnackbar("Education updated successfully!");

        // close processing dialog
        this.closeTxnProcessingDialog();
      });
  }

  /**
   * Updates introduction
   */
  private updateIntroduction(): void {
    // open processing dialog
    this.openTxnProcessingDialog();

    // update introduction
    this.checkMetamask
      .setIntroduction(this.userIntro.introduction)
      .subscribe(res => {
        if (res.status) {
          // get introduction
          this.getIntroduction();
        }

        // show snackbar
        this.showSuccessSnackbar("Introduction updated successfully!");

        // close processing dialog
        this.closeTxnProcessingDialog();
      })
  }

  /**
   * Updates work experience
   * 
   * @param Blockvitae.UserWorkExp userWork
   * UserWorkExp Object
   */
  private updateWorkExp(userWork: Blockvitae.UserWorkExp): void {
    // open processing dialog
    this.openTxnProcessingDialog();

    // update work exp
    this.checkMetamask
      .setUserWorkExp(userWork)
      .subscribe(res => {
        if (res.status) {
          // get work exp
          this.getUserWorkExp();
        }

        // show snackbar
        this.showSuccessSnackbar("Work Experience updated successfully!");

        // close processing dialog
        this.closeTxnProcessingDialog();
      })
  }

  /**
   * Deletes an workexp record
   * 
   * @param number index
   * Index of the work exp to be deleted 
   */
  public deleteWorkExp(index: number): void {
    // open processing dialog
    this.openTxnProcessingDialog();

    this.checkMetamask
      .deleteWorkExp(index)
      .subscribe(res => {
        if (res.status) {
          this.getUserEducation();
        }

        // show snackbar
        this.showSuccessSnackbar("Work Exp updated successfully!");

        // close processing dialog
        this.closeTxnProcessingDialog();
      });
  }

  /**
   * Updates project
   * 
   * @param Blockvitae.UserProject userProject
   * UserProject object
   */
  private updateProject(userProject: Blockvitae.UserProject): void {
    // open processing dialog
    this.openTxnProcessingDialog();

    // update project
    this.checkMetamask
      .setUserProject(userProject)
      .subscribe(res => {
        if (res.status) {
          // get projects
          this.getUserProjects();
        }

        // show snackbar
        this.showSuccessSnackbar("Projects updated successfully!");

        // close processing dialog
        this.closeTxnProcessingDialog();
      })
  }

  /**
   * Updates the education entry of the user
   * 
   * @param Blockvitae.UserEducation userEdu 
   * UserEducation object of the user
   */
  private updateEducation(userEdu: Blockvitae.UserEducation): void {
    // open processing dialog
    this.openTxnProcessingDialog();

    this.checkMetamask
      .setUserEducation(userEdu)
      .subscribe(res => {
        if (res.status) {
          // get education
          this.getUserEducation();
        }

        // show snackbar
        this.showSuccessSnackbar("Education updated successfully!");

        // close processing dialog
        this.closeTxnProcessingDialog();
      })
  }

  /**
   * Update user details
   */
  private updateUserDetail(): void {
    // open processing dialog
    this.openTxnProcessingDialog();

    // update user details first and then
    // update the social contacts
    this.checkMetamask
      .setUserDetail(this.userDetail)
      .subscribe(res => {
        if (res.status) {
          this.getUserDetail();
        }

        // show snackbar
        this.showSuccessSnackbar("Profile details updated successfully!");

        // close processing dialog
        this.closeTxnProcessingDialog();
      })
  }

  /**
   * Update User social
   */
  private updateUserSocial(): void {
    // open processing dialog
    this.openTxnProcessingDialog();

    // update user details first and then
    // update the social contacts
    this.checkMetamask
      .setUserSocial(this.userSocial)
      .subscribe(res => {
        if (res.status) {
          this.getUserSocial();
        }

        // show snackbar
        this.showSuccessSnackbar("Social accounts updated successfully!");

        // close processing dialog
        this.closeTxnProcessingDialog();
      })
  }

  /**
   * Update user skills
   * 
   * @param string[] userSkillsBytes 
   * Skills array where each skill string is in byte32 format
   */
  private updateUserSkills(userSkillsBytes: string[]): void {
    // open processing dialog
    this.openTxnProcessingDialog();

    this.checkMetamask
      .setUserSkills(userSkillsBytes)
      .subscribe(res => {
        if (res.status) {
          this.getUserSkills();
        }

        // show snackbar
        this.showSuccessSnackbar("Skills updated successfully!");

        // close processing dialog
        this.closeTxnProcessingDialog();
      })
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
   * Opnes transaction processing dialog
   */
  private openTxnProcessingDialog(): void {
    this.dialogRef = this.dialog.open(TransactionProcessingDialogComponent, {
      role: "alertdialog",
      disableClose: true
    });
  }

  /**
   * Closes transaction processing dialog
   */
  private closeTxnProcessingDialog(): void {
    this.dialogRef.close();
  }

  /**
   * Shows the snackbar with the given message
   * 
   * @param string message 
   * Message to be displayed on the snackbar
   */
  private showSuccessSnackbar(message: string): void {
    this.snackbar.open(message, null, {
      duration: 2000,
      panelClass: 'success'
    });
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

            // get Introduction
            this.getIntroduction();

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
   * Gets the introduction
   */
  private getIntroduction(): void {
    this.checkMetamask.getUserIntroduction()
      .subscribe(intro => {
        this.userIntro.introduction = intro;
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
        this.userDetail.location = detail[4];
      });
  }

  /**
   * Fetches all the social accounts of the user.
   * Sets null for each social account which is not present
   */
  private getUserSocial(): void {
    this.checkMetamask.getUserSocial()
      .subscribe(social => {
        this.userSocial.websiteUrl = social[0].length > 0 ? social[0] : null;
        this.userSocial.twitterUrl = social[1].length > 0 ? social[1] : null;
        this.userSocial.fbUrl = social[2].length > 0 ? social[2] : null;
        this.userSocial.githubUrl = social[3].length > 0 ? social[3] : null;
        this.userSocial.dribbbleUrl = social[4].length > 0 ? social[4] : null;
        this.userSocial.linkedinUrl = social[5].length > 0 ? social[5] : null;
        this.userSocial.behanceUrl = social[6].length > 0 ? social[6] : null;
        this.userSocial.mediumUrl = social[7].length > 0 ? social[7] : null;
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

    // empty userWorkExp
    this.userWorkExp = [];

    // observe observables
    this.checkMetamask.workExp$
      .subscribe(res => {
        let workExp = res.response;
        let userWorkExp = {
          company: workExp[0],
          position: workExp[1],
          dateStart: workExp[2],
          dateEnd: workExp[3],
          description: workExp[4],
          isWorking: workExp[5],
          isDeleted: workExp[6],
          index: res.index
        };

        // push in the array
        if (!userWorkExp.isDeleted)
          this.userWorkExp.push(userWorkExp);

        // sort workExp
        this.userWorkExp
          .sort((a: Blockvitae.UserWorkExp, b: Blockvitae.UserWorkExp) =>
            new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()
          );
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

    // empty education
    this.userEducation = [];

    // observe observables
    this.checkMetamask.education$
      .subscribe(res => {
        let education = res.response;
        let userEducation = {
          organization: education[0],
          degree: education[1],
          dateStart: education[2],
          dateEnd: education[3],
          description: education[4],
          isDeleted: education[5],
          index: res.index
        };

        // push in the array
        if (!userEducation.isDeleted)
          this.userEducation.push(userEducation);

        // sort user education
        this.userEducation
          .sort((a: Blockvitae.UserEducation, b: Blockvitae.UserEducation) =>
            new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()
          );
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

    // empty projects
    this.userProjects = [];

    // observe observables
    this.checkMetamask.project$
      .subscribe(res => {
        let project = res.response;
        let userProject = {
          name: project[0],
          shortDescription: project[1],
          description: project[2],
          url: project[3],
          isDeleted: project[4],
          index: res.index
        };

        // push in the array
        if (!userProject.isDeleted)
          this.userProjects.push(userProject);
      });
  }

  /**
   * Fetches array of user skills
   */
  private getUserSkills(): void {
    this.checkMetamask.getUserSkills()
      .subscribe(skills => {
        this.userSkills = [];
        // convert from bytes to string
        for (let i = 0; i < skills.length; i++) {
          this.userSkills
            .push(this.checkMetamask.web3.utils.hexToUtf8(skills[i]));
        }
      });
  }
}
