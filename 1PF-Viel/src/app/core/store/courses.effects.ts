import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CoursesActions } from './courses.actions';
import { CourseService } from '../services/course.service';


@Injectable()
export class CoursesEffects {
  loadCoursess$ = createEffect(() => {
    console.log(this.actions$);

    return this.actions$.pipe(
      ofType(CoursesActions.loadCourses),
      concatMap(() =>
        this.coursesService.getCourses().pipe(
          map((courses) => {
            console.log('loadCourses', courses);
            return CoursesActions.loadCoursesSuccess({ courses });
          }),
          catchError((error) => {
            console.error('Error loading courses:', error);
            return [CoursesActions.loadCoursesFailure({ error })];
          })
        )
      )
    );
  });

  addCourse$ = createEffect (() => {
    return this.actions$.pipe(
      ofType(CoursesActions.addCourse),
      concatMap((action) => 
      this.coursesService.addCourse(action.course).pipe(
        map((course) => {
          console.log('addCourse', course);
        }),
        catchError((error) => {
          console.error('Error adding course', error);
          return [CoursesActions.addCourseFailure({error})];
        })
      ))
    )
  });

  deleteCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.deleteCourse),
      concatMap(({id}) =>{
        return this.coursesService.deleteCourse (id).pipe(
          map(() => {
            return CoursesActions.deleteCourseSuccess({id});
          })
        )
      }),
      catchError((error) => {
        console.error('Error deleting course:', error);
        return [CoursesActions.deleteCourseFailure({error})];
      })
    )
  })

  constructor(
    private actions$: Actions,
    private coursesService: CourseService
  ) {
    this.actions$ = inject(Actions);
  }
}