import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Course } from '../../featured/dashboard/courses/interfaces/Course';

export const CoursesActions = createActionGroup({
  source: 'Courses/API',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Success' : props<{ courses: Course[]}>(),
    'Load Courses Failure' : props<{ error: string }>(),
    'Add Course': props<{ course: Course }>(),
    'Add Course Success': props<{ course: Course }>(),
    'Add Course Failure': props<{ error: string }>(),
    'Delete Course': props<{ id: string}>(),
    'Delete Course Success': props<{ id: string}>(),
    'Delete Course Failure': props<{ error: string}>(),
    // 'Load Coursess': props<{ coursess: Courses[] }>(),
    // 'Add Courses': props<{ courses: Courses }>(),
    // 'Upsert Courses': props<{ courses: Courses }>(),
    // 'Add Coursess': props<{ coursess: Courses[] }>(),
    // 'Upsert Coursess': props<{ coursess: Courses[] }>(),
    // 'Update Courses': props<{ courses: Update<Courses> }>(),
    // 'Update Coursess': props<{ coursess: Update<Courses>[] }>(),
    // 'Delete Courses': props<{ id: string }>(),
    // 'Delete Coursess': props<{ ids: string[] }>(),
    // 'Clear Coursess': emptyProps(),
  }
});
