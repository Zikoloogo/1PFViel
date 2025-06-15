import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { CoursesActions } from './courses.actions';
import { CourseService } from './course.service';

@Injectable()
export class CoursesEffects {
  private actions$ = inject(Actions);
  private coursesService = inject(CourseService);

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.loadCourses),
      concatMap(() =>
        this.coursesService.getCourses().pipe(
          map(courses => CoursesActions.loadCoursesSuccess({ courses })),
          catchError(error => of(CoursesActions.loadCoursesFailure({ error })))
        )
      )
    )
  );

  addCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.addCourse),
      concatMap(action =>
        this.coursesService.addCourse(action.course).pipe(
          map(course => CoursesActions.addCourseSuccess({ course })),
          catchError(error => of(CoursesActions.addCourseFailure({ error })))
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.deleteCourse),
      concatMap(({ id }) =>
        this.coursesService.deleteCourse(id).pipe(
          map(() => CoursesActions.deleteCourseSuccess({ id })),
          catchError(error => of(CoursesActions.deleteCourseFailure({ error })))
        )
      )
    )
  );

  constructor() {
    // Optional: Log all dispatched actions for debugging
    this.actions$.subscribe(action => console.log('Action dispatched:', action));
  }
}
