import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import{Router} from '@angular/router'
declare var $:any;
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  isStyleInvalid:any = {'background-color':'gray', 'border-color':'gray'};
  isStylevalid:any = {'background-color':'#09c'}
  emailNotExisted:any;
  Email=false;
  incorrectPassword:any;
  Password=false;
  isLoad=false

  constructor(private _AuthService:AuthService , private _Router:Router) {
    if(this._AuthService.isLoggedIn()){
      this._Router.navigate(['/profile']);
    }
   }

  signin=new FormGroup({

    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
  })
  
  formData(){
this.isLoad=true;
    if(this.signin.valid){
      this._AuthService.signIn(this.signin.value).subscribe(res=>{
        if(res.message=="success"){
          this.isLoad=false;
          localStorage.setItem("TOKEN" , res.token);
          this._Router.navigate(['/profile']);
        }else if(res.message=="email doesn't exist"){
          this.isLoad=false;
          this.emailNotExisted=res.message;
          this.Email=true;
          this.Password=false;
        }else if(res.message=="incorrect password"){
          this.isLoad=false;
          this.incorrectPassword=res.message;
          this.Password=true;
          this.Email=false;
        }

        console.log(res);
        
      })
    }
    console.log(this.signin);
    
  }




  ngOnInit(): void {
    $('#signIn').particleground();
  
  }

}
