import { inject, Injectable, OnInit } from '@angular/core';
import { timeSheetEntry } from '../Models/TimeSheet';
import { TimeFunctionsService } from './time-functions.service';

@Injectable({
  providedIn: 'root',
})
export class SaveTimeSheetService {
  timeSheetEntries: timeSheetEntry[] = [];
  timeFunctions = inject(TimeFunctionsService);
  previousTime: {
    prev: string;
  } = { prev: '00:00:00' };
  time: {
    timeIn: string;
  } = { timeIn: this.getTime() };
  flag: {
    flag1: boolean;
  } = {
    flag1: false,
  };

  saveTimeSheet(
    projectId: number,
    milestoneId: number,
    taskId: number,
    time: string,
    notes: string
  ) {
    const ans = this.timeSheetEntries.find(
      (val) =>
        val.projectId === projectId &&
        val.milestoneId === milestoneId &&
        val.taskId === taskId
    );

    const arr: string[] = [];

    if (ans) {
      const timeUpdated = this.timeFunctions.addTime(ans.time, time);
      ans.notes.push(notes + ' ' + time);
      ans.time = timeUpdated;
      return;
    }

    arr.push(notes + ' : ' + time);
    const formData = {
      projectId: projectId,
      milestoneId: milestoneId,
      taskId: taskId,
      time: time,
      notes: arr,
    };

    this.timeSheetEntries.push(formData);
  }

  // to get time
  getTime(): string {
    const now: Date = new Date();
    const startTime: Date = new Date();
    startTime.setHours(9, 0, 0, 0);

    const timeDifference: number = now.getTime() - startTime.getTime();
    const hours: number = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes: number = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds: number = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // check for maximum time
    if (hours >= 8) {
      return 8 + ':' + '00' + ':' + '00';
    } else {
      return hours + ':' + minutes + ':' + seconds;
    }
  }
  constructor() {}
}
