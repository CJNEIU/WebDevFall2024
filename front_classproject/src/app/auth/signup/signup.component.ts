import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  isLoading:boolean=false;

  constructor(private authService: AuthService){

  }

  onSignup(form:NgForm){
    console.log('Form Submitted:', form.value);;
    if(form.invalid){
      return;
    }

    this.authService.createUser(form.value.email, form.value.password);
  }
}
