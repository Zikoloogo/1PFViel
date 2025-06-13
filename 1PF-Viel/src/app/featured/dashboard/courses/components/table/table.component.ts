import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../interfaces/Course';
import { CourseService } from '../../../../../core/services/course.service';
import { Store } from '@ngrx/store';
import { RootState } from '../../../../../core/store';
import { Observable } from 'rxjs';
import { CoursesActions } from '../../store/courses.actions';
import { CoursesState } from '../../store/courses.reducer';
import {
  selectIsLoading,
  selectError,
  selectCourses,
} from '../../store/courses.selectors';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'course-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'see-more', 'delete'];
  dataSource: Course[] = [];
  // courseForm: FormGroup;

  courses$: Observable<Course[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(
    private courseService: CourseService,
    private store: Store<RootState>,
    private MatDialog: MatDialog
  ) // @Inject('TITLE') private title: string

  {
    {
      this.courses$ = this.store.select(selectCourses);
      this.isLoading$ = this.store.select(selectIsLoading);
      this.error$ = this.store.select(selectError);

      // this.courseForm = this.fb.group({
      //   title: ['', [Validators.required, Validators.minLength(3)]],
      //   description: ['', [Validators.required, Validators.maxLength(200)]],
      // });
    }
  }

  ngOnInit(): void {
    this.store.dispatch(CoursesActions.loadCourses());
    this.store.select(selectCourses).subscribe({
      next: (courses) => {
        console.log('Courses from store:', courses);
        this.dataSource = courses;
      },
      error: (error) => {
        console.error('Error fetching courses from store:', error);
      },
    });
  }

  // addCourse(): void {
  //   if (this.courseForm.valid) {
  //     const newCourse: Course = this.courseForm.value;
  //     this.dataSource = [...this.dataSource, newCourse];
  //     this.courseForm.reset();
  //   } else {
  //     alert('Please fix the form errors before submitting.');
  //   }
  // }

  deleteRow(course: Course): void {
    this.dataSource = this.dataSource.filter((c) => c !== course);
  }

  deleteCourse(id: string) {
    this.MatDialog
    .open(DialogComponent).afterClosed()
    .subscribe({
      next: (confirmed: boolean) => {
        if (confirmed) {
          this.store.dispatch(CoursesActions.deleteCourse({ id }));
        }
      },
      error: (error) => {
        console.error( 'Error opening dialog:', error);
      },
    })
  }

  editCourse(id: string) {
    this.courseService.setUpdateCourse(id);
  }
}
