import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/router/app.state';
import { getToggle } from '../state/counter.selector';
import { customIncrement, toggleCustomInput } from '../state/counter.actions';

@Component({
  selector: 'app-counter-input',
  templateUrl: './counter-input.component.html',
  styleUrls: ['./counter-input.component.css']
})
export class CounterInputComponent implements OnInit{

  constructor(
      private store: Store<AppState>
    ){}
    customValue: number = 0;
    showCustomInput$: Observable<boolean> | null = null;

    ngOnInit(){
      this.showCustomInput$ =this.store.select(getToggle);
    }

    onCustomValueButtonClicked(){
      this.store.dispatch(customIncrement({value: +this.customValue}));
    }

    onToggleClicked(){
      this.store.dispatch(toggleCustomInput())
    }
}
