import { Component, Input } from '@angular/core';
import { Student } from '../../interfaces/Student';

@Component({
  selector: 'student-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() students: Student[] = [];
  displayedColumns: string[] = ['name', 'curso', 'clase'];
}
