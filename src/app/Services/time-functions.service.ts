import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeFunctionsService {
  differenceBetweenTime(time1: string, time2: string): string {
    const [hours1, minutes1, seconds1] = time1.split(':').map(Number);
    const [hours2, minutes2, seconds2] = time2.split(':').map(Number);

    const totalSeconds1: number = hours1 * 3600 + minutes1 * 60 + seconds1;
    const totalSeconds2: number = hours2 * 3600 + minutes2 * 60 + seconds2;

    let differenceSeconds: number = totalSeconds1 - totalSeconds2;

    let negativeFlag: boolean = false;
    if (differenceSeconds < 0) {
      negativeFlag = true;
      differenceSeconds = Math.abs(differenceSeconds);
    }

    const hours: number = Math.floor(differenceSeconds / 3600);
    differenceSeconds %= 3600;
    const minutes: number = Math.floor(differenceSeconds / 60);
    const seconds: number = differenceSeconds % 60;

    const formattedDifference: string = `${hours}:${minutes}:${seconds}`;

    return negativeFlag ? `-${formattedDifference}` : formattedDifference;
  }

  addTime(time1: string, time2: string): string {
    const [hours1, minutes1, seconds1] = time1.split(':').map(Number);
    const [hours2, minutes2, seconds2] = time2.split(':').map(Number);
    const totalSeconds1 = hours1 * 3600 + minutes1 * 60 + seconds1;
    const totalSeconds2 = hours2 * 3600 + minutes2 * 60 + seconds2;

    let totalSeconds = totalSeconds1 + totalSeconds2;

    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return formattedTime;
  }

  fromTimeToTime(prev: string) {
    prev = this.addTime(prev, '9:00:00');
    const [hours1, minutes2, seconds3]: number[] = prev.split(':').map(Number);

    const dateWithTime: Date = new Date();
    dateWithTime.setHours(hours1, minutes2, seconds3, 0);

    const now: Date = new Date();
    const startTime: Date = dateWithTime;

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
