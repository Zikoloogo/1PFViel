import { Component } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Student } from './students/interfaces/Student';
import { forkJoin, from, Observable, of } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '1PF-Viel';
  showFiller = false;

  posts!: Observable<any[]>;
  post!: Observable<any>;

constructor() {
  const observables =forkJoin([
  from(
    fetch('https://jsonplaceholder.typicode.com/posts').then((res)=>
    res.json())
  )])
  observables.subscribe({
    next([posts, post]) {
      this.posts = of(posts);
      this.post = of(post);
    }
  })
}
}