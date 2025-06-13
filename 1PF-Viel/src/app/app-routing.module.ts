import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './featured/dashboard/home/home.component';
import { StudentsComponent } from './featured/dashboard/students/students.component';
import { CoursesComponent } from './featured/dashboard/courses/courses.component';
import { DetailsComponent } from './featured/dashboard/courses/pages/details/details.component';
import { LoginComponent } from './featured/auth/login/login.component';
import { DashboardComponent } from './featured/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./featured/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./featured/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
