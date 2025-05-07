import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../interfaces/Course';
import { CourseService } from '../../../../../core/services/course.service';

@Component({
  selector: 'course-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'see-more', 'delete'];
  dataSource: Course[] = [];
  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    @Inject('TITLE') private title: string
  ) {

    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  ngOnInit(): void {
    this.courseService.getCourses();
    this.courseService.courses$.subscribe({
      next: (data) => {
        console.log(data);
        this.dataSource = data;
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      }
    })
    // this.courseService.courses$.subscribe((data) => {
    //   this.dataSource = data;
    // });
  }

  addCourse(): void {
    if (this.courseForm.valid) {
      const newCourse: Course = this.courseForm.value;
      this.dataSource = [...this.dataSource, newCourse];
      this.courseForm.reset();
    } else {
      alert('Please fix the form errors before submitting.');
    }
  }

  deleteRow(course: Course): void {
    this.dataSource = this.dataSource.filter((c) => c !== course);
  }

  deleteCourse(id: string) {
    this.courseService.deleteCourse(id);
  }

  editCourse(id: string) {
    this.courseService.setUpdateCourse(id);
  }
}
