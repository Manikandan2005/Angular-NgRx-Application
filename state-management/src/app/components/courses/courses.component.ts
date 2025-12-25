import { Component } from '@angular/core';
import { readCourses, showForm } from './state/courses.actions';
import { getCourses, getShowForm } from './state/courses.selector';
import { Router } from '@angular/router';
import { AppState } from 'src/app/store/router/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  standalone : false
})
export class CoursesComponent {
  courses$: Observable<Course[]> | null = null;
  showForm$: Observable<boolean> | null = null;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ){}

  ngOnInit(){
    this.courses$ = this.store.select(getCourses);
    this.showForm$ = this.store.select(getShowForm);
    this.store.dispatch(readCourses())
  }
  showCreateForm(){
    this.router.navigateByUrl('courses?edit=false');
    this.store.dispatch(showForm({value: true}));
  }
}
