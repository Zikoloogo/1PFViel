import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { SharedModule } from '../shared/shared.module';
import { StudentsService } from './services/students.service';
import { MAT_FORM_FIELD, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { APP_CONFIG, config } from '../core/injection-token';

@NgModule({
  declarations: [
    FormComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    
  ],
  exports: [
    FormComponent,
    TableComponent,
  ],
  providers: [
{
  provide:'TITLE',
  useValue:'Student Management'
},
{
  provide: APP_CONFIG,
  useValue: config,
},
{
  provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
  useValue: { appearance: 'outline'}
}
]
})
export class StudentsModule {}
