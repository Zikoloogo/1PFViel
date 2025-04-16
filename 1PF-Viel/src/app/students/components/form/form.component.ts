import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';

@Component({
  standalone:false,
  selector: 'student-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private matDialog: MatDialog) {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      curso: ['', Validators.required],
      clase: ['', Validators.required],
    });
  }

  submit() {
    if (this.formGroup.invalid) return;

    const studentData = this.formGroup.value;
    this.matDialog
      .open(DialogComponent, {
        data: { content: `¿Desea agregar al alumno ${studentData.name} ${studentData.lastName}?` },
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          // Add logic to append the student to the table
          console.log('Student added:', studentData);
          this.formGroup.reset();
        }
      });
  }
}
