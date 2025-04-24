import { Component } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Student } from './students/interfaces/Student';
import { forkJoin, from, map, Observable, of } from 'rxjs';

interface Post{
  id: number;
  userId: number;
  title: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = '1PF-Viel';
  showFiller = false;

  posts!: Observable<Post[]>;
  post!: Observable<Post>;

constructor() {
  this.posts =
  from(
    fetch('https://jsonplaceholder.typicode.com/posts').then((res)=>
    res.json())
  ).pipe(map(posts => posts.filter((p: Post) => p.userId === 1 && p.id <= 2)
))
}
}