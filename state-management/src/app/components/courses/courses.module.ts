import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { COURSES_STATE } from 'src/app/constants';
import { coursesReducer } from './state/courses.reducer';
import { CoursesEffect } from './state/courses.effects';


const routes: Routes = [
    { path: '', component: CoursesComponent},
    { path: 'course/:id', component: CourseDetailComponent}
]

@NgModule({
  declarations: [
    CoursesComponent,
    CourseCardComponent,
    AddCourseComponent,
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([CoursesEffect]),
    RouterModule.forChild(routes),
    StoreModule.forFeature(COURSES_STATE, coursesReducer)
  ]
})
export class CoursesModule { }
