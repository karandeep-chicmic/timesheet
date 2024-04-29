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
  flag: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.projects = this.coursesService.projects;
    this.time = this.saveToTimeSheetService.time.timeIn;

    this.time = this.time.split(':')[0] + ':' + this.time.split(':')[1];
    this.time = this.formatDate(this.time);
  }

  formatDate(timeString: string) {
    const [hours, minutes] = timeString.split(':');

    // Convert hours and minutes to integers
    const hoursInt = parseInt(hours, 10);
    const minutesInt = parseInt(minutes, 10);

    return `${hoursInt.toString().padStart(2, '0')}:${minutesInt
      .toString()
      .padStart(2, '0')}`;
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
      this.notes.trim() != '' &&
      this.saveToTimeSheetService.flag.flag1 != true
    ) {
      if (true) {
        const [hours, minutes] = this.time.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        if (date.getHours() >= 8) {
          alert('You Exceeded the Time!!');
          this.time = '8:00';
          this.saveToTimeSheetService.flag.flag1 = true;
          this.time = this.formatDate(this.time);
        }
      }

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
    } else if (this.saveToTimeSheetService.flag.flag1 === true) {
      alert('You have already exceeeded 8 hours');
    } else {
      alert('All the Fields Are Required !!!');
    }
  }

  // reload the timesheet whenever reload button is clicked
  reloadTimeSheet() {
    const t = this.time.split(':')[0];
    const date = new Date();
    date.setHours(t, 0, 0, 0);
    console.log(date.getHours());

    if (date.getHours() < 8)
      this.time =
        this.saveToTimeSheetService.previousTime.prev != '00:00:00'
          ? this.timeFunctions.fromTimeToTime(
              this.saveToTimeSheetService.previousTime.prev
            )
          : this.saveToTimeSheetService.getTime();

    this.time = this.time.split(':')[0] + ':' + this.time.split(':')[1];
    this.time = this.formatDate(this.time);
  }
}
