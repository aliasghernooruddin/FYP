import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

//Import Firebase and Firestore
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

//get firebase credentials
import { environment } from '../environments/environment';

//angular toast
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//import angular material
import {MatButtonModule, MatCheckboxModule,MatGridListModule,MatInputModule,MatIconModule} from '@angular/material';
import { ChartModule } from 'angular2-chartjs';
import { MatTableModule } from '@angular/material'

// pages for the application
import { HomePageComponent } from './home-page/home-page.component'
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HttpClientModule } from  '@angular/common/http';
import { AuthGuard } from '../app/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UserDashboardComponent,
    AdminDashboardComponent
  ],
  imports: [
    MatButtonModule, 
    MatCheckboxModule,
    MatGridListModule,
    ChartModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFireAuthModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
