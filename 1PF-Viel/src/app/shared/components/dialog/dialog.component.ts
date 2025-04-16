import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone: false,
  selector: 'shared-dialog',
  template: `
    <h2 mat-dialog-title>¿Desea agregar al alumno?</h2>
    <mat-dialog-content>
      <p>{{content}}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button (click)="submit()">Confirm</button>
    </mat-dialog-actions>
  `
})
export class DialogComponent {
  @Input() content!: string;

  constructor(private matDialogRef: MatDialogRef<DialogComponent>) {}

  submit() {
    this.matDialogRef.close(true);
  }
}
