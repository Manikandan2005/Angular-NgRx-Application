import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environments } from "src/app/environments/environment";
import { Course } from "src/app/models/course.model";

@Injectable({
    providedIn: 'root'
})

export class CourseService{
    constructor(private http : HttpClient){}

    createCourse(course : Course) : Observable<{name : string}>{
        const url = `${environments.firebaseConfig.databaseURL}/courses.json`
        return this.http.post<{name : string}>(url, course)
    }

    readCourses() : Observable<Course[]>{
        return this.http.get(`${environments.firebaseConfig.databaseURL}/courses.json`).pipe(
            map((data) => {
                const courses : Course[] = [];
                for(let key in data){
                    const course = { ...data[key], id: key };
                    courses.push(course);
                }
                return courses;
            })
        )
    }
}