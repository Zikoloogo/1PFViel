import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Course } from '../../featured/dashboard/courses/interfaces/Course';
import { CoursesActions } from './courses.actions';

export const coursesFeatureKey = 'courses';

export interface CoursesState {
  courses: Course[];
  isLoading: boolean;
  error: any;
}

export const initialState: CoursesState = {
  courses: [],
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(CoursesActions.loadCourses, (state) => {
    console.log('loadCourses');

    return {
      ...state,
      isLoading: true,
    };
  }),
  on(CoursesActions.loadCoursesSuccess, (state, { courses }) => {
    console.log('loadCoursesSuccess', courses);

    return {
      ...state,
      isLoading: false,
      courses,
    };
  }),
  on(CoursesActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(CoursesActions.loadCoursesFailure, (state, {error}) => ({
    ...state,
    isLoading:false,
    error,
  })),

  on(CoursesActions.addCourse, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

      on(CoursesActions.addCourseSuccess, (state, {course}) => {
    return {
      ...state,
      isLoading: false,
      courses: [...state.courses, course],
    };}),

      on(CoursesActions.addCourseFailure, (state, {error}) => {
    return {
      ...state,
      isLoading: false,
      error,
    };}),

    on(CoursesActions.deleteCourse, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(CoursesActions.deleteCourseSuccess, (state, {id}) => {
    return {
      ...state,
      isLoading: false,
      courses: state.courses.filter((course) => course.id !== id),
    };
  }),

  on(CoursesActions.deleteCourseFailure, (state, {error}) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  }),
);

export const courseFeature = createFeature({
  name: coursesFeatureKey,
  reducer,
});
