import { TestBed } from '@angular/core/testing';
import { CourseService } from './course.service';
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import { provideHttpClient } from '@angular/common/http';
import { Course } from '../../featured/dashboard/courses/interfaces/Course';
import { environment } from '../../../environments/environment.development';

describe('Course Service Test', () => {
    let CourseService: CourseService;
    let httpMock: HttpTestingController;

    beforeEach(() =>{
        TestBed.configureTestingModule({
            providers: [CourseService, provideHttpClient(), provideHttpClientTesting()],
        });

        courseService = TestBed.inject(CourseService);
        httpMock = TestBed.inject(HttpTestingController);
        });

        afterEach(() =>{
            httpMock.verify();
        });

        it('should use POST method to add a new course', () =>{
            const course = {id: 'abjad', title: 'UX-UI'} as Course;

            courseService.addCourse(course).subscribe((response) =>{
                expect(response).toEqual(course);
            });

            const req = httpMock.expectOne(
                `${environment.apiUrl}/courses/`
            );
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual(course);

            req.flush(course)
        });

        it('should use DELETE request to delete a course', ()=>{
            CourseService.deleteCourse(courseFeature.id).subscribe((response) =>{
                expect(response).toBeTruthy();
            })

           const req = httpMock.expectOne(
                `${environment.apiUrl}/courses/${course.id}`
            );

            expect(req.request.method).toBe('DELETE');
            req.flush({});
        })
    
    
});