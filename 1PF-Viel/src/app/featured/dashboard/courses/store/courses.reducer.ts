import { createFeature, createReducer, on } from '@ngrx/store';
import { Course } from '../interfaces/Course'; // Adjust import as needed
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

  // Load Courses
  on(CoursesActions.loadCourses, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(CoursesActions.loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    isLoading: false,
    courses,
  })),
  on(CoursesActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Add Course
  on(CoursesActions.addCourse, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(CoursesActions.addCourseSuccess, (state, { course }) => ({
    ...state,
    isLoading: false,
    courses: [...state.courses, course],
  })),
  on(CoursesActions.addCourseFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Delete Course
  on(CoursesActions.deleteCourse, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(CoursesActions.deleteCourseSuccess, (state, { id }) => ({
    ...state,
    isLoading: false,
    courses: state.courses.filter((course) => course.id !== id),
  })),
  on(CoursesActions.deleteCourseFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);

export const courseFeature = createFeature({
  name: coursesFeatureKey,
  reducer,
});
