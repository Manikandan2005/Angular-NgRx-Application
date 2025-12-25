import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState } from "./courses.state";
import { COURSES_STATE } from "src/app/constants";
    
const getCoursesState = createFeatureSelector<CoursesState>(COURSES_STATE);

export const getCourses = createSelector(getCoursesState, (state) => {
    return state.courses;
})

export const getShowForm = createSelector(getCoursesState, (state) => {
    return state.showForm;
})