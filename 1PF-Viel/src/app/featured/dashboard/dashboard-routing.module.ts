import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';
import { CoursesComponent } from './courses/courses.component';
import { DetailsComponent } from './courses/pages/details/details.component';
import { DashboardComponent } from './dashboard.component';
import { adminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'students', component: StudentsComponent, canActivate: [adminGuard] },
      { path: 'courses', component: CoursesComponent },
      { path: 'courses/:title', component: DetailsComponent },
      { path: 'counter', loadChildren: () => import('./counter/counter.module').then(m => m.CounterModule) },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
