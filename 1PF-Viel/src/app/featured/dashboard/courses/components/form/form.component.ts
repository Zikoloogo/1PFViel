import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../../../shared/components/dialog/dialog.component';
import { CourseService } from '../../../../../core/services/course.service';

@Component({
  selector: 'course-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  formGroup: FormGroup;

  constructor(
    private courseService: CourseService,
    private fb: FormBuilder,
    private matDialog: MatDialog
  ) {
    this.formGroup = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  submit() {
    if (this.formGroup.valid) {
      this.matDialog
        .open(DialogComponent)
        .afterClosed()
        .subscribe({
          next: (confirmed: boolean) => {
            if (confirmed) {
              const course = this.formGroup.value;
              this.courseService.addCourse(course);
              this.formGroup.reset();
            }
          },
          error: (error) => {
            console.error('Error:', error);
          },
        });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
