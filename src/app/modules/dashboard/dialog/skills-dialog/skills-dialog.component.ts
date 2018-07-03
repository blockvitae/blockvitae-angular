import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-skills-dialog',
  templateUrl: './skills-dialog.component.html',
  styleUrls: ['./skills-dialog.component.scss']
})
export class SkillsDialogComponent {

  // binded with input
  // holds string of skills
  public skills: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public userSkills: string[]
  ) { 
    this.skills = this.userSkills.join(", ");
  }

  public onSpaceSkills(event): void {
    // 188 is keycode for comma
    if (event.keyCode === 188 || event === 'blur' || event === 'mouseenter') {
      this.userSkills = this.skills.split(",");
    }
  }
}
