import { Component, Input } from '@angular/core';
import { deleteCourse, showForm } from '../state/courses.actions';
import { Course } from 'src/app/models/course.model';
import { Router } from '@angular/router';
import { AppState } from 'src/app/store/router/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
  standalone : false
})
export class CourseCardComponent {
     constructor(
    private store: Store<AppState>,
    private router: Router
  ){}

  @Input() course: Course | null = null;

  onCourseEdit(){
    this.store.dispatch(showForm({ value: true }))
    this.router.navigateByUrl(`/courses?id=${this.course.id}&edit=true`)
  }

  onDeleteClicked(){
    const doDelete = confirm('Do you really want to delete this course?');
    if(doDelete){
      this.store.dispatch(deleteCourse({id: this.course.id}))
    }    
  }

  showDetailsClicked(){
    this.router.navigate(['courses', 'course', this.course.id])
  }
}
