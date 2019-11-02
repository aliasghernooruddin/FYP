import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from '../app/home-page/home-page.component';
import { AdminDashboardComponent } from '../app/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from '../app/user-dashboard/user-dashboard.component';
import { AuthGuard } from '../app/auth.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: '*', component: HomePageComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'user/:username', component: UserDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
