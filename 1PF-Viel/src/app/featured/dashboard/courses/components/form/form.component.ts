import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../../../shared/components/dialog/dialog.component';
import { CourseService } from '../../../../../core/services/course.service';
import { v4 as uuidv4 } from 'uuid';
import { Course } from '../../interfaces/Course';

@Component({
  selector: 'course-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: false,
})
export class FormComponent implements OnInit {
  formGroup: FormGroup;
  isEdit: boolean = false;

  constructor(
    private courseService: CourseService,
    private fb: FormBuilder,
    private matDialog: MatDialog
  ) {
    this.formGroup = this.fb.group({
      id: [''],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  ngOnInit(): void {
    this.courseService.courseEdit$.subscribe((course: Course | null) => {
      if (course) {
        this.formGroup.patchValue({
          id: course.id,
          title: course.title,
          description: course.description,
        });
        this.isEdit = true;
      } else {
        this.formGroup.reset();
      }
    });
  }

  submit(): void {
    if (this.formGroup.valid) {
      const id = this.isEdit ? this.formGroup.value.id : uuidv4();
      this.formGroup.patchValue({ id });

      this.matDialog
        .open(DialogComponent)
        .afterClosed()
        .subscribe({
          next: (confirmed: boolean) => {
            if (confirmed) {
              if (this.isEdit) {
                this.courseService.updateCourse(this.formGroup.value);
              } else {
                this.courseService.addCourse(this.formGroup.value);
              }
              this.formGroup.reset();
              this.isEdit = false;
            }
          },
          error: (error) => {
            console.error('Error while processing dialog confirmation:', error);
          },
        });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
// import { Component, Inject } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatDialog } from '@angular/material/dialog';
// import { DialogComponent } from '../../../../../shared/components/dialog/dialog.component';
// import { CourseService } from '../../../../../core/services/course.service';
// import { v4 as uuidv4 } from 'uuid';
// import { Course } from '../../interfaces/Course';

// @Component({
//   selector: 'course-form',
//   standalone: false,
//   templateUrl: './form.component.html',
//   styleUrls: ['./form.component.scss'],
// })
// export class FormComponent {
//   formGroup: FormGroup;
//   isEdit: boolean = false;

//   constructor(
//     private courseService: CourseService,
//     private fb: FormBuilder,
//     private matDialog: MatDialog
//   ) 
//   {
//     this.formGroup = this.fb.group({
//       id: [''],
//       title: ['', [Validators.required, Validators.minLength(3)]],
//       description: ['', [Validators.required, Validators.maxLength(200)]],
//     });
//   }

//   this.courseService.courseEdit$.subscribe((course) => {
//     if (course) {
//       this.formGroup.patchValue({
//         id: course.id,
//         title: course.title,
//         description: course.description,
//       });
//       this.isEdit = true;
//     } else {
//       this.formGroup.reset();
//     }
//   });
// }

// submit() {
//   this.formGroup.patchValue({
//     id: this.isEdit ? this.formGroup.value.id : uuidv4(),
//   });

//   this.matDialog
//     .open(DialogComponent)
//     .afterClosed()
//     .subscribe({
//       next: (confirmed: boolean) => {
//         if (confirmed) {
//           console.log(this.formGroup.value);
//           if (this.isEdit) {
//             this.courseService.updateCourse(this.formGroup.value);
//           } else {
//             this.courseService.addCourse(this.formGroup.value);
//           }

//           this.formGroup.reset();
//           this.isEdit = false;
//         }
//       },
//       error: (error) => {
//         console.error('Error:', error);
//       },
//     });
// }


// //   submit() {
// //     if (this.formGroup.valid) {
// //       this.matDialog
// //         .open(DialogComponent)
// //         .afterClosed()
// //         .subscribe({
// //           next: (confirmed: boolean) => {
// //             if (confirmed) {
// //               const course = this.formGroup.value;
// //               this.courseService.addCourse(course);
// //               this.formGroup.reset();
// //             }
// //           },
// //           error: (error) => {
// //             console.error('Error:', error);
// //           },
// //         });
// //     } else {
// //       this.formGroup.markAllAsTouched();
// //     }
// //   }

