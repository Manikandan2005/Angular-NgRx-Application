import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { signUpStart } from '../states/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{

  signUpForm : FormGroup;

  constructor(private fb : FormBuilder, private store : Store){
    this.signUpForm = this.fb.group({
      email : [null, [Validators.required, Validators.email]],
      password : [null, Validators.required]
    })
  }

  ngOnInit(): void {
    
  }

  onSignUp(){
    const {email, password} = this.signUpForm.value;
    this.store.dispatch(signUpStart({email : email, password : password}))
  }
}
