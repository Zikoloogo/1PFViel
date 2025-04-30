import { Component } from '@angular/core';
import {
  delay,
  forkJoin,
  from,
  interval,
  Observable,
  Observer,
  of,
} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showFiller = false;
  showStudents = true;

  users!: Observable<any[]>;
  user!: Observable<any>;

  observables!: Observable<any[]>;

  constructor() {}

  toggleStudents() {
    this.showStudents = !this.showStudents;
  }

  getUser(): Observable<any> {
    return of({
      username: 'Jorge Drexler',
      role: 'admin',
    }).pipe(delay(2000));
  }
}
