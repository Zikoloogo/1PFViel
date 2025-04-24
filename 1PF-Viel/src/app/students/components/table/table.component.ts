import { Component, Inject, Input, OnInit } from '@angular/core';
import { Student } from '../../interfaces/Student';
import { StudentsService } from '../../services/students.service';


@Component({
  selector: 'student-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit{
  @Input() students: Student[] = [];
  displayedColumns: string[] = ['name', 'curso', 'clase'];
  dataSource: Student[] = [];

constructor(
  private studentsService: StudentsService,
  @Inject('TITLE') private title: string) 
  {
  this.dataSource = this.studentsService.getStudents();
}

ngOnInit(): void {
  this.studentsService.getStudentsObs();
  this.studentsService.students$.subscribe((data) => {
    console.log(data);
    this.dataSource = data;
  })
}
}
