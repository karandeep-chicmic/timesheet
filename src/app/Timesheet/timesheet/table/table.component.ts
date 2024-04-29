import { Component, inject, OnInit } from '@angular/core';
import { milestone, projects, task } from 'src/app/Models/Courses';
import { timeSheetEntry } from 'src/app/Models/TimeSheet';
import { CoursesService } from 'src/app/Services/courses.service';
import { SaveTimeSheetService } from 'src/app/Services/save-time-sheet.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  timeSheetEntries: timeSheetEntry[] = [];
  saveTimeSheetService = inject(SaveTimeSheetService);
  courseService = inject(CoursesService);

  projectName(id: number): string {
    const str: projects = this.courseService.projects.find(
      (x) => x.id === id
    ) || { id: -1, name: '' };
    return str.name;
  }
  milestoneName(id: number): string {
    const str: milestone = this.courseService.mileStone.find(
      (x) => x.id2 === id
    ) || { id2: -1, name2: '', pid: -1 };
    return str.name2;
  }

  taskName(id: number): string {
    const str: task = this.courseService.Task.find((x) => x.id3 === id) || {
      id3: -1,
      name3: '',
      pid2: -1,
    };
    return str.name3;
  }

  ngOnInit(): void {
    this.timeSheetEntries = this.saveTimeSheetService.timeSheetEntries;
  }
}
