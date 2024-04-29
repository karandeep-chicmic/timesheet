import { NgModule } from '@angular/core';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimesheetComponent } from './Timesheet/timesheet/timesheet.component';
import { NavbarComponent } from './Navbar/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './Timesheet/timesheet/table/table.component';
import { TimesheetDetailsComponent } from './Timesheet/timesheet/timesheet-details/timesheet-details.component';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    TimesheetComponent,
    NavbarComponent,
    TableComponent,
    TimesheetDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
