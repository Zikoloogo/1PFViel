import { Injectable } from '@angular/core';
import { Student } from '../interfaces/Student';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private dataSubject = new BehaviorSubject<Student[]>([]);
  students$ = this.dataSubject.asObservable();

private _students: Student[] = [
  {
    name: 'Javier',
  lastName: 'Sanchez',
  curso: 'string',
  clase: 'string',
  },

];
getStudents(): Student[] {
  return this._students;
}
getStudentsObs() {
  this.dataSubject.next(this._students);
}
addStudent(student: Student): void{
  this._students.push(student);
}
addStudentObs(student: Student) {
  this._students = [... this._students, student];
  this.dataSubject.next(this._students)
}

  constructor() { }
}
