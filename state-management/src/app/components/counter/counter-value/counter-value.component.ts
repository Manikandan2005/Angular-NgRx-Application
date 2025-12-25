import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/router/app.state';
import { getCounter } from '../state/counter.selector';

@Component({
  selector: 'app-counter-value',
  templateUrl: './counter-value.component.html',
  styleUrls: ['./counter-value.component.css']
})
export class CounterValueComponent{

  constructor(
    private store: Store<AppState>
  ){}
  
  counter$: Observable<number> | null = null;

  ngOnInit(){
    this.counter$ = this.store.select(getCounter);
  }

}
