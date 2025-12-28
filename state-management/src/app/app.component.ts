import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getErrorMessage, getIsLoading } from './shared/shared.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone : false
})
export class AppComponent implements OnInit{
  title = 'state-management';
  loading$ : Observable<boolean> | null = null;
  errorMessage$ : Observable<string> | null = null;

  constructor(private store : Store){

  }

  ngOnInit(){
    this.loading$ = this.store.select(getIsLoading)
    this.errorMessage$ = this.store.select(getErrorMessage);
  }
}
