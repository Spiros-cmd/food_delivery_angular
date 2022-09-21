import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:any;
  message:any;
  mvalue:any;
  succ:any;
  successfull = {
    'email': 'eve.holt@reqres.in',
    'password': 'cityslicka'
  }

  unsuccesfull = {
    'email': 'eve.holt@reqres.in'
  }

  constructor(private fb:FormBuilder,private auth:AuthService, private router:Router){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.maxLength(20)], /*Validators.pattern("^[a-zA-Z]+$")*/]
    })
  }

  ReadCredentialsHandler() {
    this.auth.credentials().subscribe({
      next: response => this.succ = response,
      error: (error: any) => console.log(error),
      complete: () => console.log('complete')
    });
  }

  loginUser(){
    this.message = this.loginForm.status;
    this.mvalue = this.loginForm.value;
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  login(){
    this.auth.login(this.successfull).subscribe({
      next: result => this.router.navigate(['home'])
    });
  }

}
