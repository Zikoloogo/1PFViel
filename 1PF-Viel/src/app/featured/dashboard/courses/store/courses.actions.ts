import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Course } from '../interfaces/Course';

export const CoursesActions = createActionGroup({
  source: 'Courses/API',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ courses: Course[] }>(),
    'Load Courses Failure': props<{ error: string }>(),

    'Add Course': props<{ course: Course }>(),
    'Add Course Success': props<{ course: Course }>(),
    'Add Course Failure': props<{ error: string }>(),

    'Update Course': props<{ course: Update<Course> }>(),
    'Update Course Success': props<{ course: Update<Course> }>(),
    'Update Course Failure': props<{ error: string }>(),

    'Delete Course': props<{ id: string }>(),
    'Delete Course Success': props<{ id: string }>(),
    'Delete Course Failure': props<{ error: string }>(),
  },
});
