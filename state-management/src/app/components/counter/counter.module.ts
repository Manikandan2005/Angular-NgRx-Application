import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterButtonComponent } from './counter-button/counter-button.component';
import { CounterValueComponent } from './counter-value/counter-value.component';
import { CounterComponent } from './counter.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { COUNTER_STATE } from 'src/app/constants';
import { counterReducer } from './state/counter.reducer';
import { CounterInputComponent } from './counter-input/counter-input.component';

const routes: Routes = [
    { path: '', component: CounterComponent }
]


@NgModule({
  declarations: [
    CounterComponent,
    CounterValueComponent,
    CounterButtonComponent,
    CounterInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(COUNTER_STATE, counterReducer)
  ]
})
export class CounterModule { }
