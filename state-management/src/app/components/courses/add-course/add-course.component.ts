import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Course } from 'src/app/models/course.model';
import { AppState } from 'src/app/store/router/app.state';
import { createCourse, showForm, updateCourse } from '../state/courses.actions';

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
    if(!this.courseForm.valid){
      return;
    }
    if(this.editMode){
  
      const updatedCourse: Course = {
        id: this.course.id,
        title: this.courseForm.value.title,
        description: this.courseForm.value.description,
        author: this.courseForm.value.author,
        price: +this.courseForm.value.price,
        image: this.courseForm.value.image
      }

      this.store.dispatch(updateCourse({course : updatedCourse}));

    }else{
      this.store.dispatch(createCourse({course : this.courseForm.value }))
    }
    this.store.dispatch(showForm({ value: false}));
  }

  fileUploadEvent(event : any){
    const span = document.querySelector('.file-name');
    span.textContent = (event.target as HTMLInputElement).files[0].name
  }

}
