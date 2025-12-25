import { Component, OnInit } from '@angular/core';
import { loginStart } from '../states/auth.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../services/auth.service';
import { AppState } from 'src/app/store/router/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
     constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ){}
  loginForm: FormGroup;
  loggedInUser: User;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    })
  } 

  onLogin(){
    const { email, password } = this.loginForm.value;
    // this.authService.login(email, password).subscribe((response) => {
    //   this.loggedInUser = response;
    // })
    console.log('action called !')
    this.store.dispatch(loginStart({email, password}));
  }

  validateEmail(){
    const emailControl = this.loginForm.get('email');
    if(emailControl.touched && !emailControl.valid){
      if(emailControl.errors['required']){
        return 'Email is a required field.';
      }
      if(emailControl.errors['email']){
        return 'Email is not valid.';
      }
    }
    return '';
  }

  validatePassword(){
    const pswdControl = this.loginForm.get('password');
    if(pswdControl.touched && !pswdControl.valid){
      if(pswdControl.errors['required']){
        return 'Password is a required field.';
      }
    }
    return '';
  }
}
