import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/router/app.state';
import { setErrorMessage } from '../shared.actions';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent implements OnInit {

  @Input() errorMessage = ''

  constructor(private store : Store<AppState>) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.store.dispatch(setErrorMessage({message : ''}))
    }, 5000)
  }

}
