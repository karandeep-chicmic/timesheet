import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/Services/firebase.service';

@Component({
  selector: 'app-timesheet-details',
  templateUrl: './timesheet-details.component.html',
  styleUrls: ['./timesheet-details.component.css'],
})
export class TimesheetDetailsComponent implements OnInit {
  test = inject(FirebaseService);

  data: any = [];
  ngOnInit() {
    this.data = this.test.get().firestore;
  }
}
