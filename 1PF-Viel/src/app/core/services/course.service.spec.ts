import { TestBed } from '@angular/core/testing';
import { CourseService } from '../../featured/dashboard/courses/store/course.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Course } from '../../featured/dashboard/courses/interfaces/Course';
import { environment } from '../../../environments/environment.development';

describe('Course Service Test', () => {
  let courseService: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseService, provideHttpClient(), provideHttpClientTesting()],
    });

    courseService = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should use POST method to add a new course', () => {
    const course: Course = { id: '123', title: 'UX-UI', description: 'Design course' }; // Added `description` for completeness

    courseService.addCourse(course).subscribe((response) => {
      expect(response).toEqual(course);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/courses`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(course);

    req.flush(course);
  });

  it('should use DELETE request to delete a course', () => {
    const courseId = '123'; // Using a standalone ID

    courseService.deleteCourse(courseId).subscribe((response) => {
      expect(response).toBeTruthy(); // DELETE usually doesn't return a body, so we expect a truthy response
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/courses/${courseId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
