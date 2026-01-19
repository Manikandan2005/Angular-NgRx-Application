import { createReducer, on } from "@ngrx/store";
import { initialState } from "./courses.state";
import { createCourseSuccess, readCoursesSuccess, setEditMode, showForm, updateCourseSuccess } from "./courses.actions";

export const coursesReducer = createReducer(
    initialState,
    on(showForm, (state, action) => {
        return {
            ...state,
            showForm: action.value
        }
    }),

    on(createCourseSuccess, (state, action)=>{
        const course = { ...action.course }
        course.id = (state.courses.length + 1).toString();

        return {
            ...state,
            courses: [...state.courses, action.course]
        }
    }),

    on(readCoursesSuccess, (state, action)=>{
        return {
            ...state,
            courses : action.courses
        }
    }),

    on(updateCourseSuccess, (state, action) =>{
        
    })

    on(setEditMode, (state, action)=>{
        return {
            ...state,
            
        }
    }),
)