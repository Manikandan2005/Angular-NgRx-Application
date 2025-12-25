import { Component, OnInit } from '@angular/core';
import { decrement, increment, reset } from '../state/counter.actions';
import { AppState } from 'src/app/store/router/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-counter-button',
  templateUrl: './counter-button.component.html',
  styleUrls: ['./counter-button.component.css']
})
export class CounterButtonComponent{

  constructor(
    private store: Store<AppState>
  ){}

  onIncrement(){
    this.store.dispatch(increment())
  }
  onDecrement(){
    this.store.dispatch(decrement())
  }
  onReset(){
    this.store.dispatch(reset()) 
  }

}
