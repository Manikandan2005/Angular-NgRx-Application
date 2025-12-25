import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Course } from 'src/app/models/course.model';
import { AppState } from 'src/app/store/router/app.state';
import { showForm } from '../state/courses.actions';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
  standalone : false
})
export class AddCourseComponent implements OnInit{
  courseForm: FormGroup;
  editMode: boolean = false;
  course: Course = null;
  selectedImage: File | null = null;

  constructor(
    private store: Store<AppState>,
  ){}

  ngOnInit() {
    this.init();
  }

  init(){
    this.courseForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100)
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(5000)
      ]),
      author: new FormControl(null, [
        Validators.required
      ]),
      price: new FormControl(null),
      image: new FormControl(null)
    })
  }


  hideCreateForm(){
    this.store.dispatch(showForm({value: false}));
  }

  onCreateOrUpdateCourse(){
    console.log(this.courseForm);
  }

}
