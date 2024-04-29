import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimesheetComponent } from './Timesheet/timesheet/timesheet.component';
import { TimesheetDetailsComponent } from './Timesheet/timesheet/timesheet-details/timesheet-details.component';

const routes: Routes = [
  // { path: '', redirectTo: 'timesheet', pathMatch: 'full' },
  {
    path: 'timesheet',
    component: TimesheetComponent,
  },
  {
    path: 'timesheetDetails',
    component: TimesheetDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
