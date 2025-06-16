import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { CoursesModule } from './courses/courses.module';
import { StudentsModule } from './students/students.module';
import { RobotComponent } from './robot/robot.component';

@NgModule({
  declarations: [DashboardComponent, RobotComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoursesModule,
    StudentsModule,
    DashboardRoutingModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
