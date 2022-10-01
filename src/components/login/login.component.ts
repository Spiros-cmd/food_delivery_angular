import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  loginForm!:FormGroup;
  message:any;
  mvalue:any;
  succ:any=[];
  users:any=[];
  successfull = {
    'email': 's.christodoulou@pmmretail.com',
    'password': '8frhev9'
  }

  unsuccesfull = {
    'email': 'eve.holt@reqres.in'
  }

  constructor(private fb:FormBuilder,private auth:AuthService, private router:Router){}

  ngOnInit(): void {
    this.ReadCredentialsHandler()
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.maxLength(20)], /*Validators.pattern("^[a-zA-Z]+$")*/]
    })
  }

  ReadCredentialsHandler() {
    this.auth.credentials().subscribe({
      next: response => {
        this.succ = response;
        localStorage.setItem('succ', JSON.stringify(this.succ));
      },
      error: (error: any) => console.log(error),
      complete: () => console.log('complete')
    });
  }

  log(){
    // this.succ.forEach((u:any) => {
    //   let user={
    //     email:u.email,
    //     password:u.password
    //   }
    //   this.users.push(user)
    //   console.log(user);
    // });
    let user=this.succ.find((u:any)=>{
      return u.email===this.loginForm.value.email && u.password===this.loginForm.value.password
    });
    console.log(user);
    if(user){
      alert('Login Success');
      this.loginForm.reset();
      this.router.navigate(['home'])
    }else{
      alert('user not found');
    }
  }

  // log(){
  //   this.auth.credentials()
  //   .subscribe(res=>{
  //     const user=res.find((a:any)=>{
  //       return a.email===this.loginForm.value.email && a.password===this.loginForm.value.password
  //     });
  //     if(user){
  //       console.log(user);
  //       alert('Login Success');
  //       this.loginForm.reset();
  //       this.router.navigate(['home'])
  //     }else{
  //       alert('user not found');
  //     }
  //   },(err: any)=>{
  //     alert('Something went wrong!')
  //   })
  // }

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
    this.auth.loginn(this.successfull).subscribe({
      next: () => this.router.navigate(['home'])
    });
  }

}
