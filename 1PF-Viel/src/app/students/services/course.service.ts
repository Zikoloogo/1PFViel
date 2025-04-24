// import { Injectable } from "@angular/core";

// @Injectable({
//     providedIn: 'root'
// })
// export class CourseService {
//     private dataSubject = new Subject<Course[]>();
//     courses$ = this.dataSubject.asObservable();
//     private _courses: Course[] = [
//         {
//         title: 'Angular',
//         description: 'Angular funciona algo'
// }];
// getCourses(): void {
//     this.dataSubject.next(this._courses)
// }
// addCourse (course: Course): void{
//     this._courses = [ ... this._courses];
// }
// }