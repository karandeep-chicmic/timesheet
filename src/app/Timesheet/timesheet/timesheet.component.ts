import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { milestone, projects, task } from 'src/app/Models/Courses';
import { CoursesService } from 'src/app/Services/courses.service';
import { SaveTimeSheetService } from 'src/app/Services/save-time-sheet.service';
import { TimeFunctionsService } from 'src/app/Services/time-functions.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
})
export class TimesheetComponent implements OnInit {
  // services
  coursesService = inject(CoursesService);
  saveToTimeSheetService = inject(SaveTimeSheetService);
  router = inject(Router);
  timeFunctions = inject(TimeFunctionsService);

  selectedOption: string = '';
  projects: projects[] = [];
  milestones: milestone[] = [];
  tasks: task[] = [];
  selectedProjectId: number = 0;
  selectedMilestoneId: number = 0;
  selectedTaskId: number = 0;
  time: any;
  notes: string = '';
  totalTimeLeft: string = '';

  constructor() {}

  ngOnInit(): void {
    this.projects = this.coursesService.projects;
    this.time = this.saveToTimeSheetService.time.timeIn;
  }

  // When Project DropDown Changes
  projectChange(event: any) {
    let projectId = Number(event.target.value);
    this.selectedTaskId = 0;
    this.tasks = [];
    this.selectedProjectId = projectId;

    this.milestones = [
      ...this.coursesService.mileStone.filter((val) => val.pid === projectId),
    ];
  }

  // When Milestone DropDown Changes
  milestoneChange(event: any) {
    let milestoneId = Number(event.target.value);
    this.selectedMilestoneId = milestoneId;

    this.tasks = [
      ...this.coursesService.Task.filter((val) => val.pid2 === milestoneId),
    ];
  }

  // When Task DropDown Changes
  taskChange(event: any) {
    let taskId = Number(event.target.value);
    this.selectedTaskId = taskId;
  }

  // Submit Timesheet
  onSubmit() {
    if (
      this.selectedMilestoneId != 0 &&
      this.selectedProjectId != 0 &&
      this.selectedTaskId != 0 &&
      this.notes != ''
    ) {
      const prevToNow: string =
        this.saveToTimeSheetService.previousTime.prev != '00:00:00'
          ? this.timeFunctions.fromTimeToTime(
              this.saveToTimeSheetService.previousTime.prev
            )
          : this.saveToTimeSheetService.time.timeIn;

      this.saveToTimeSheetService.saveTimeSheet(
        this.selectedProjectId,
        this.selectedMilestoneId,
        this.selectedTaskId,
        prevToNow,
        this.notes
      );

      this.saveToTimeSheetService.previousTime = {
        prev: this.timeFunctions.addTime(
          this.saveToTimeSheetService.time.timeIn,
          this.saveToTimeSheetService.previousTime.prev
        ),
      };

      this.selectedOption = '';
      this.selectedMilestoneId = 0;
      this.selectedProjectId = 0;
      this.selectedTaskId = 0;
      this.milestones = [];
      this.saveToTimeSheetService.time = { timeIn: '00:00:00' };
      this.tasks = [];
      this.notes = '';
      this.reloadTimeSheet();
    } else {
      alert('All the Fields Are Required !!!');
    }
  }

  // reload the timesheet whenever reload button is clicked
  reloadTimeSheet() {
    this.time =
      this.saveToTimeSheetService.previousTime.prev != '00:00:00'
        ? this.timeFunctions.fromTimeToTime(
            this.saveToTimeSheetService.previousTime.prev
          )
        : this.saveToTimeSheetService.getTime();
  }
}
