import { skip } from "rxjs";
import { Student } from "../../featured/dashboard/students/interfaces/Student";
import { StudentsService } from "./students.service";
import { TestBed } from "@angular/core/testing";

describe('StudentsService', () => {
    let service: StudentsService;

    const studentsArray: Student[] = [
{
    firstName: 'Jorge',
    lastName: 'Drexler',
    email: 'JDrex@gmail.com',
    course: 'angular',
},
{
    firstName: 'Juan',
    lastName: 'Estofado',
    email: 'Jado@gmail.com',
    course: 'react',
},
    ]

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StudentsService);
    });

    it('should be created', () => {
        expect (service).toBeTruthy();
    });

    it('should return initial students with getStudents', () => {
        const students = service.getStudents();

        expect(students).toEqual(studentsArray);
    });

    it('should emit students through student$ when getStudentsObs() is called', (done) => {
        service.students$.pipe(skip(1)).subscribe((students) =>{
            expect(students).toEqual(studentsArray);
            done();
        });
        service.getStudentsObs();
    });
    
    
})