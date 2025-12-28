import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getLoggedUser } from 'src/app/auth/states/auth.selector';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/store/router/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone : false
})
export class HeaderComponent {
    constructor(
    private store: Store<AppState>
  ){}

  loggedUser$: Observable<User>;

  ngOnInit(): void {
    this.loggedUser$ = this.store.select(getLoggedUser)
  }

  onLogoutClicked(){
    
  }
}
