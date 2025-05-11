import { Component, Inject, Injector } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StudentsService } from '../../../../../core/services/students.service';
import { APP_CONFIG, AppConfig } from '../../../../../core/injection-token';
import { DialogComponent } from '../../../../../shared/components/dialog/dialog.component';
import { CourseService } from '../../../../../core/services/course.service';
import { Observable, tap, filter, map } from 'rxjs';

@Component({
  selector: 'student-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  formGroup: FormGroup;
  courseNames: string[] = [];
  courseTitles: Observable<string[]>;

  private courseService: CourseService;

  constructor(
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private studentsService: StudentsService,
    private injector: Injector, // Injecting the Injector
    @Inject(APP_CONFIG) private config: AppConfig
  ) {
    console.log(config);

    this.formGroup = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      course: [''],
    });

    // Lazy load CourseService to avoid circular dependency
    this.courseService = this.injector.get(CourseService);

    // Subscribe to course titles from CourseService
    this.courseTitles = this.courseService.coursesTitles$;

    // Fetch courses titles once
    this.courseService.getCoursesTitles();

    // Subscribe and transform course titles
    this.courseService.coursesTitles$
      .pipe(
        tap((courses) => console.log(`Tap: ${courses}`)),
        filter((courses) => courses.length > 0),
        map((courses) => courses.map((course) => course.toUpperCase())),
        map((courses) => courses.sort((a, b) => a.localeCompare(b))),
        tap((courses) => console.log(`Transformed Courses: ${courses}`))
      )
      .subscribe((courses) => {
        console.log('Final Courses:', courses);
        this.courseNames = courses;
      });
  }

  // Handle the form submission
  submit() {
    this.matDialog
      .open(DialogComponent)
      .afterClosed()
      .subscribe({
        next: (confirmed: boolean) => {
          if (confirmed) {
            console.log('Form Values:', this.formGroup.value);
            this.studentsService.addStudentObs(this.formGroup.value);
            this.formGroup.reset(); // Reset form after submission
          }
        },
        error: (error) => {
          console.error('Error during submission:', error);
        },
      });
  }
}
