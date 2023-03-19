import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import {Router} from '@angular/router'

declare var $:any;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  isStyleInvalid:any = {'background-color':'gray', 'border-color':'gray'};
  isStylevalid:any = {'background-color':'#09c'}
  isClicked:boolean =false;
  responseMsg = "";
  isSuccess:boolean = false;
  isUniqueEmailMessage = "";
  isUniqueEmail =false;

  constructor(private _AuthService:AuthService ,private _Router:Router ) {
    if(this._AuthService.isLoggedIn()){
      this._Router.navigate(['/profile'])
    }
   }

  signup=new FormGroup({
    first_name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(8)]),
    last_name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(8)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    age:new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(3)]),
    password:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
  })
  
  formData(){
    this.isClicked =true;
        if(this.signup.valid){
          this._AuthService.signUp(this.signup.value).subscribe(response=>{
            console.log(response);
             
            if(response.message=="success"){
              this.isClicked =false;
              this.isSuccess= true;
              this.responseMsg = response.message;
              this.signup.reset();
              this.isUniqueEmail =false;
              this._Router.navigate(['/signin'])
            }else{
              this.isUniqueEmailMessage = response.errors.email.message;
              this.isUniqueEmail =true;
              this.isClicked =false;
              this.isSuccess= false;
            }
            console.log(response);
            
            
          })
        }
  }




  ngOnInit(): void {
    $('#signUp').particleground();
  
  }

}
